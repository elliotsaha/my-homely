const router = require("express").Router();
const SellerListing = require("../model/SellerForm");
const User = require("../model/User");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

exports.search = async (req, res) => {
  try {
    const result = await SellerListing.find(
      {
        "query.StreetAddress": { $regex: req.body.address, $options: "i" },
        approved: "True",
      },
      { "query.StreetAddress": 1 }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.searchCards = async (req, res) => {
  try {
    const filter = req.body.query;
    const result = await SellerListing.find(
      {
        "query.StreetAddress": {
          $regex: req.body.address ? req.body.address : "",
          $options: "i",
        },
        "query.PropertyType": { $in: filter.PropertyType },
        approved: "True",
        "query.Bedrooms": { $gte: filter.BedsMin },
        "query.Bathrooms": { $gte: filter.BathsMin },
        "query.AskingPrice": { $gte: filter.PriceMin, $lte: filter.PriceMax },
        "query.HouseSize.area": {
          $gte: filter.SquareFeetMin,
          $lte: filter.SquareFeetMax,
        },
        "query.LotSize.area": { $gte: filter.LotSize },
        "query.YearBuilt": {
          $gte: filter.YearBuiltMin,
          $lte: filter.YearBuiltMax,
        },
      },
      {
        "query.StreetAddress": 1,
        "query.Bathrooms": 1,
        "query.Bedrooms": 1,
        "query.HouseSize": 1,
        "query.AskingPrice": 1,
        "query.HouseImages": 1,
        location: 1,
      }
    )
      .skip((req.body.page - 1) * 5)
      .limit(5);

    const pagination = await SellerListing.countDocuments({
      "query.StreetAddress": {
        $regex: req.body.address ? req.body.address : "",
        $options: "i",
      },
      "query.PropertyType": { $in: filter.PropertyType },
      approved: "True",
      "query.Bedrooms": { $gte: filter.BedsMin },
      "query.Bathrooms": { $gte: filter.BathsMin },
      "query.AskingPrice": { $gte: filter.PriceMin, $lte: filter.PriceMax },
      "query.HouseSize.area": {
        $gte: filter.SquareFeetMin,
        $lte: filter.SquareFeetMax,
      },
      "query.LotSize.area": { $gte: filter.LotSize },
      "query.YearBuilt": {
        $gte: filter.YearBuiltMin,
        $lte: filter.YearBuiltMax,
      },
    });

    res.status(200).json({
      results: result,
      pagination: pagination,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.setFavourite = async (req, res) => {
  try {
    const listing = await SellerListing.findById(req.body.id);
    if (!listing) {
      res.status(400).json({
        status: "Failure",
        err: "No Listing Found",
      });
    }
    const userID = res.locals.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $push: { favourites: listing._id } },
      { upsert: true, new: true }
    );
    res.status(200).json({
      status: "Success",
      favourites: updatedUser.favourites,
    });
    console.log(updatedUser);
  } catch (err) {
    res.status(400).json({
      err: "catch",
      msg: err,
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const listing = await SellerListing.findById(req.body.id);
    if (!listing) {
      res.status(400).json({
        status: "Failure",
        err: "No Listing Found",
      });
    }
    const userID = res.locals.user._id;
    console.log(userID);
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $pull: { favourites: listing._id } },
      { upsert: true, new: true }
    );
    res.status(200).json({
      status: "Success",
      favourites: updatedUser.favourites,
    });
  } catch (err) {
    res.status(400).json({
      err: "catch",
      msg: err,
    });
  }
};
exports.getFavourites = async (req, res) => {
  try {
    const userID = res.locals.user._id;
    const user = await User.findById(userID);
    const favourites = user.favourites;
    const favouriteListings = [];
    for (let i = 0; i < favourites.length; i++) {
      const listing = await SellerListing.findById(favourites[i]);
      favouriteListings.push(listing);
    }
    res.status(200).send(favouriteListings);
  } catch (err) {
    res.status(400).json({
      err: "catch",
      msg: err,
    });
  }
};

exports.sendShowingTime = async (req, res) => {
  try {
    // GENERATE UUID
    const uuid = uuidv4();

    const usr = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $push: { showingTimeHistory: uuid } },
      { upsert: true, new: true }
    );

    const userName = res.locals.user.name;
    const { string, owner, address, day, type } = req.body;
    const msg = {
      to: owner,
      from: "info@myhomely.io",
      templateId: "d-b73a52c66a9e47b788d994399fa8f54b",
      dynamicTemplateData: {
        Name: userName,
        Time: string,
        Street_Address: address,
        Day: day,
        Type: type,
        Server_api: process.env.SERVER_API,
        acceptLink: `${process.env.SERVER_API}/api/buyer/acceptShowingTimeReq?query=${uuid}&date=${string}&address=${address}&day=${day}`,
        declineLink: `${process.env.SERVER_API}/api/buyer/denyShowingTimeReq?query=${uuid}&date=${string}&address=${address}&day=${day}`,
        uuid: uuid,
      },
      //      subject: `Accept Home Showing from ${userName}`,
      //     html: `${userName} is trying to book ${string} as a showing time for your property located at ${address}. Click here to accept: <a href="
      //     ${process.env.SERVER_API}/api/buyer/acceptShowingTimeReq?query=${uuid}&date=${string}&address=${address}&day=${day}&start=${start}&end=${end}">ACCEPT</a>, click here to deny: <a href="${process.env.SERVER_API}/api/buyer/denyShowingTimeReq?query=${uuid}">DENY</a>`,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
      .send(msg)
      .then(() => {
        console.log("Sent Email");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

exports.acceptShowingTimeReq = async (req, res) => {
  let { query, address, date, day } = req.query;
  const user = await User.find({ showingTimeHistory: query });
  console.log(query);
  const msg = {
    to: user,
    from: "info@myhomely.io",
    templateId: "d-a900209c97be405e8b0f880e9471549c",
    dynamicTemplateData: {
      date: date,
      day: day,
      address: address,
    },
  };

  //TODO: FIXME
  /*
  await SellerListing.findOneAndUpdate(
    {
      "query.StreetAddress": address,
    },
    {
      $pull: { "query.HomeShowingDates": { day: day, start: start, end: end } },
    }
  );
    * */
  //TODO: FIXME
  // await User.findOne({ showingTimeHistory: query }, function (err, user) {
  //   user.showingTimeHistory[query] = undefined;
  //  user.save();
  // });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Sent Email");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).redirect(`${process.env.CLIENT_URL}/?success=true`);
};

exports.requestTime = async (req, res) => {
  try {
  } catch (err) {}
};

exports.denyShowingTimeReq = async (req, res) => {
  let { query, address, date, day } = req.query;
  const user = await User.find({ showingTimeHistory: query });
  console.log(query);
  const msg = {
    to: user,
    from: "info@myhomely.io",
    templateId: "d-ebf65f6330994cceb2e1439213eadfde",
    dynamicTemplateData: {
      date: date,
      day: day,
      address: address,
    },
  };

  //TODO: FIXME
  /*
  await SellerListing.findOneAndUpdate(
    {
      "query.StreetAddress": address,
    },
    {
      $pull: { "query.HomeShowingDates": { day: day, start: start, end: end } },
    }
  );
    * */
  //TODO: FIXME
  // await User.findOne({ showingTimeHistory: query }, function (err, user) {
  //   user.showingTimeHistory[query] = undefined;
  //  user.save();
  // });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Sent Email");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).redirect(`${process.env.CLIENT_URL}/?success=true`);
};
