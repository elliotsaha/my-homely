const router = require("express").Router();
const nodemailer = require("nodemailer");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const SellerListing = require("../model/SellerForm");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const UnsubscribeFromEmails = require("../model/UnsubscribedEmails");

exports.getAllUsers = async (req, res) => {
  try {
    if (req.body.query === "") {
      let allUsers = await User.find();
      res.status(200).send(allUsers);
    } else {
      let allUsers = await User.find({
        email: { $regex: req.body.query, $options: "i" },
      });
      res.status(200).send(allUsers);
    }
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: "Failure to reach database",
    });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    await User.find({ role: "admin" }, (err, obj) => {
      if (err || !obj) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to reach database",
        });
      }
      res.status(200).send(obj);
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: "Failure to reach database",
    });
  }
};

exports.getAllPhotographyers = async (req, res) => {
  try {
    await User.find({ role: "photography" }, (err, obj) => {
      if (err || !obj) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to reach database",
        });
      }
      res.status(200).send(obj);
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: "Failure to reach database",
    });
  }
};

exports.getAllLawyers = async (req, res) => {
  try {
    await User.find({ role: "lawyer" }, (err, obj) => {
      if (err || !obj) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to reach database",
        });
      }
      res.status(200).send(obj);
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: "Failure to reach database",
    });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const emailReq = req.body.email;
    const roles = ["photography", "admin", "lawyer"];
    if (roles.includes(req.body.role) === false) {
      return res.status(400).send("Invalid Role");
    }

    await User.findOne({ email: emailReq }, (err, obj) => {
      if (err || !obj) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to find User",
        });
      }
    });

    await User.findOneAndUpdate(
      { email: emailReq },
      { role: req.body.role },
      (err, doc) => {
        if (err) {
          res.status(400).json({
            status: "Failure",
            msg: "Failure to find User",
          });
        }
        console.log(doc);
        res.status(200).json({
          status: "Success",
          msg: `Successfully changed ${emailReq} to ${req.body.role}`,
        });
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const emailReq = req.body.email;

    await User.findOne({ email: emailReq }, (err, obj) => {
      if (err || !obj) {
        return res.status(400).json({
          status: "Failure",
          msg: "Failure to Find User",
        });
      }
    });

    await User.findOneAndUpdate(
      { email: emailReq },
      { role: "user" },
      (err, doc) => {
        if (err || !doc) {
          return res.status(400).json({
            status: "Failure",
            msg: "Failure to Find User",
          });
        } else {
          res.status(200).json({
            status: "Success",
            msg: `Successfully changed ${emailReq} from ${doc.role} to user`,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.banUser = async (req, res) => {
  try {
    const emailReq = req.body.email;

    await User.findOne({ email: emailReq }, (err, obj) => {
      if (err || !obj) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to Find User",
        });
      }
    });

    User.findOneAndUpdate({ email: emailReq }, { banned: true }, (err, doc) => {
      if (err || !doc) {
        res.status(400).json({
          status: "Failure",
          msg: "Failure to Find User",
        });
      } else {
        res.status(200).json({
          status: "Success",
          msg: `Successfully Banned ${emailReq}`,
          doc: doc,
        });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.submitPropertyPhotos = async (req, res) => {
  const { listingID, values } = req.body;
  const { HouseImages, video, floorplan, virtualTour } = values;

  // Create New Submission
  const s3Bucket = new aws.S3({
    params: { Bucket: "myhomelyimages" },
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: "us-east-2",
  });

  const HouseImagesAWS = [];
  for (let i = 0; i < HouseImages.length; i++) {
    let uuid = uuidv4();
    let buf = Buffer.from(
      HouseImages[i].image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    let data = {
      Key: "property/" + uuid,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    HouseImagesAWS.push(
      `https://myhomelyimages.s3.us-east-2.amazonaws.com/property/${uuid}`
    );

    s3Bucket.putObject(data, function (err, data) {
      if (err) {
        return res.status(400).send(err);
      }
    });
  }

  let videoBuf = Buffer.from(
    video.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  let videoUUID = uuidv4();

  let videoDirectURL = `https://myhomelyimages.s3.us-east-2.amazonaws.com/property/${videoUUID}`;

  let videoData = {
    Key: "property/" + videoUUID,
    Body: videoBuf,
    ContentEncoding: "base64",
    ContentType: "video/mp4",
  };

  s3Bucket.putObject(videoData, function (err, data) {
    if (err) {
      return res.status(400).send(err);
    }
  });

  // FLOORPLAN
  let floorplanBuf = Buffer.from(
    floorplan.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  let floorplanUUID = uuidv4();

  let floorplanDirectData = `https://myhomelyimages.s3.us-east-2.amazonaws.com/property/${floorplanUUID}`;

  let floorplanData = {
    Key: "property/" + floorplanUUID,
    Body: floorplanBuf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };

  s3Bucket.putObject(floorplanData, function (err, data) {
    if (err) {
      return res.status(400).send(err);
    }
  });

  const listing = await SellerListing.findOneAndUpdate(
    { _id: listingID },
    {
      "query.HouseImages": HouseImagesAWS,
      "query.Video": videoDirectURL,
      "query.Floorplan": floorplanDirectData,
      "query.VirtualTour": virtualTour,
      approved: "Pending",
    },
    { new: true, upsert: true }
  );
  console.log(listing);
  res.status(200).send("Success");
};

exports.submitLegalDocuments = async (req, res) => {
  try {
    const { listingID, ProvidedLegalDocuments } = req.body;

    const Listing = await SellerListing.findById(listingID);

    // Create New Submission
    const s3Bucket = new aws.S3({
      params: { Bucket: "myhomelyimages" },
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
      region: "us-east-2",
    });

    const LegalDocumentsAWS = [];
    for (let i = 0; i < ProvidedLegalDocuments.length; i++) {
      let uuid = uuidv4();
      let buf = Buffer.from(
        ProvidedLegalDocuments[i].file.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      let data = {
        Key: "legalPapers/" + uuid,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "application/pdf",
        ContentDisposition: "inline",
      };

      LegalDocumentsAWS.push(
        `https://myhomelyimages.s3.us-east-2.amazonaws.com/legalPapers/${uuid}`
      );

      s3Bucket.putObject(data, function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error uploading data", data);
        } else {
          console.log("success");
          console.log(data);
        }
      });
    }

    SellerListing.findOneAndUpdate(
      { _id: listingID },
      {
        "query.LegalServices.providedLegalDocuments": LegalDocumentsAWS,
        approved: "Pending",
      },
      { new: true, upsert: true }
    ).then((err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(doc);
        res.status(200).send(doc);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.unsubscribeFromEmails = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(400).send("User Doesn't Exist");
    }

    const search = await UnsubscribeFromEmails.find({ email: user.email });
    if (search) {
      return res.status(200).send("Already Unsubscribed");
    }

    const unsubscribe = new UnsubscribeFromEmails({
      email: user.email,
    });

    await unsubscribe.save();

    return res.status(200).send(unsubscribe);
  } catch (err) {
    return res.status(400).send(err);
  }
};
