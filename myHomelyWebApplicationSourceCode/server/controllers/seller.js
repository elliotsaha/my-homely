const router = require("express").Router();
const nodemailer = require("nodemailer");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const User = require("../model/User");
const SellerListing = require("../model/SellerForm");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");
const mailchimpTx = require("@mailchimp/mailchimp_transactional")(
  "GvYb0Wdr1Iw6KiucJ_mwzA"
);

exports.viewUnapprovedListings = async (req, res) => {
  try {
    const allListings = await SellerListing.find({ approved: "Pending" });
    res.status(200).send(allListings);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.viewNeedPhotography = async (req, res) => {
  try {
    const allListings = await SellerListing.find({
      approved: "Pending Photography",
    });
    res.status(200).send(allListings);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.viewNeedLegals = async (req, res) => {
  try {
    const allListings = await SellerListing.find({
      approved: "Pending Legals",
    });
    res.status(200).send(allListings);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.viewApprovedListings = async (req, res) => {
  try {
    const allListings = await SellerListing.find({ approved: "True" });
    res.status(200).send(allListings);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.approveListing = async (req, res) => {
  try {
    SellerListing.findByIdAndUpdate(
      req.body.id,
      { approved: "True" },
      { new: true, upsert: true },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          console.log(result);
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          console.log(result);

          const msg = {
            to: result.sentBy,
            from: "info@myhomely.io",
            templateId: "d-3aace7f2ff1f483498e49d0eb0992a4c",
            dynamicTemplateData: {
              Street: result.query.StreetAddress,
            },
          };

          sgMail
            .send(msg)
            .then(() => {
              console.log("SendGrid Email Sent");
            })
            .catch((err) => {
              console.log(err);
            });

          return res.json({
            success: true,
            listing: result,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.disapproveListing = async (req, res) => {
  try {
    SellerListing.findByIdAndUpdate(
      req.body.id,
      { approved: "False" },
      { new: true, upsert: true },

      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          /*
          if (req.body.reason === "" || req.body.reason === undefined) {
            return res.status(400).json({
              msg: "Error, invalid denial reason",
            });
            * */
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const msg = {
            to: res.locals.user.email,
            from: "info@myhomely.io",
            templateId: "d-83a4beb282f942a6a8ad82fe9d1dca92",
            dynamicTemplateData: {
              Street: result.query.StreetAddress,
            },
          };

          sgMail
            .send(msg)
            .then(() => {
              return res.status(200).json({
                success: true,
                listing: result,
              });
            })
            .catch((err) => {
              return res.status(400).send(err);
            });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.viewMyListings = async (req, res) => {
  try {
    const userListings = await SellerListing.find({
      sentBy: res.locals.user.email,
    });
    res.status(200).send(userListings);
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      err: "Problem Loading Database, Please Try Again Later",
    });
  }
};

exports.viewAllListings = async (req, res) => {
  try {
    const listings = await SellerListing.find();
    res.status(200).send(listings);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.viewUserListings = async (req, res) => {
  try {
    const emailReq = req.body.email;
    const client = await User.findOne({ email: emailReq });
    if (!client) {
      res.status(400).json({
        status: "Failure",
        msg: "Account Does not exist",
      });
    }

    await SellerListing.find({ sentBy: emailReq }, (err, docs) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(docs);
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: err,
    });
  }
};

exports.deleteForm = async (req, res) => {
  // Check if listing exists from given ID
  try {
    const listing = await SellerListing.findById(req.body.id);

    // If User's Email is the same as the sentBy email, this is an authenticated request
    if (listing.sentBy === res.locals.user.email) {
      // Attempt to delete listing
      try {
        await SellerListing.findByIdAndDelete(req.body.id, (err, doc) => {
          if (err) {
            res.status(400).json({
              status: "Failure",
              err: "Problem Deleting Property, Please Try Again Later",
            });
          } else {
            res.status(200).json({
              status: "Success",
              propertyDeleted: doc,
            });
          }
        });
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(400).json({
        status: "Failure",
        msg: "Unauthenticated Request",
      });
    }
  } catch (err) {
    // If Listing Doesnt Exist
    res.status(400).json({
      status: "Failure",
      msg: "Listing Doesn't Exist",
    });
  }
};

exports.changeForm = async (req, res) => {
  // Check if listing exists from given ID
  try {
    const listing = await SellerListing.findById(req.body.id);

    // If User's Email is the same as the sentBy email, this is an authenticated request
    if (listing.sentBy === res.locals.user.email) {
      // Attempt to Update listing
      try {
        await SellerListing.findByIdAndUpdate(
          req.body.id,
          // req.query is the new listing
          req.query,
          (err, doc) => {
            if (err) {
              res.status(400).json({
                status: "Failure",
                err: "Problem Deleting Property, Please Try Again Later",
              });
            } else {
              res.status(200).json({
                status: "Success",
                propertyDeleted: doc,
              });
            }
          }
        );
      } catch (err) {
        res.send(err);
      }
    } else {
      res.status(400).json({
        status: "Failure",
        msg: "Unauthenticated Request",
      });
    }
  } catch (err) {
    // If Listing Doesnt Exist
    res.status(400).json({
      status: "Failure",
      msg: "Listing Doesn't Exist",
    });
  }
};

exports.submitForm = async (req, res) => {
  // Create New Submission
  const s3Bucket = new aws.S3({
    params: { Bucket: "myhomelyimages" },
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: "us-east-2",
  });

  const HouseImagesAWS = [];
  for (let i = 0; i < req.body.query.HouseImages.length; i++) {
    let uuid = uuidv4();
    let buf = Buffer.from(
      req.body.query.HouseImages[i].image.replace(
        /^data:image\/\w+;base64,/,
        ""
      ),
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
        console.log(err);
        console.log("Error uploading data", data);
      } else {
        console.log("success");
        console.log(data);
      }
    });
  }

  req.body.query.HouseImages = HouseImagesAWS;

  await axios.post(
    "https://api.pipedrive.com/v1/leads?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
    {
      title: `${res.locals.user.name} Has Set Up a Seller Listing at Property Address: ${req.body.query.StreetAddress}`,
      person_id: res.locals.user.pipeDriveId,
    }
  );

  // Conversion from Meter to Feet
  if (req.body.query.LotSize.unit === "Square Meter") {
    let width = parseFloat(req.body.query.LotSize.width) * 3.28084;
    let length = parseFloat(req.body.query.LotSize.length) * 3.28084;
    req.body.query.LotSize.width = width;
    req.body.query.LotSize.length = length;
    req.body.query.LotSize.unit = "Square Feet";
    req.body.query.LotSize.area = width * length;
  } else {
    req.body.query.LotSize.width = parseFloat(req.body.query.LotSize.width);
    req.body.query.LotSize.length = parseFloat(req.body.query.LotSize.length);
    req.body.query.LotSize.area =
      parseFloat(req.body.query.LotSize.width) *
      parseFloat(req.body.query.LotSize.length);
  }

  // Conversion from Meter to Feet
  if (req.body.query.HouseSize.unit === "Square Meter") {
    let width = parseFloat(req.body.query.HouseSize.width) * 3.28084;
    let length = parseFloat(req.body.query.HouseSize.length) * 3.28084;
    req.body.query.HouseSize.width = width;
    req.body.query.HouseSize.length = length;
    req.body.query.HouseSize.unit = "Square Feet";
    req.body.query.HouseSize.area = width * length;
  } else {
    req.body.query.HouseSize.width = parseFloat(req.body.query.HouseSize.width);
    req.body.query.HouseSize.length = parseFloat(
      req.body.query.HouseSize.length
    );
    req.body.query.HouseSize.area =
      parseFloat(req.body.query.HouseSize.width) *
      parseFloat(req.body.query.HouseSize.length);
  }

  // converting strings to ints FIXME: fix tmp fixes
  if (req.body.query.Bedrooms === "5+") {
    req.body.query.Bedrooms = 5;
  } else {
    req.body.query.Bedrooms = parseInt(req.body.query.Bedrooms);
  }

  if (req.body.query.Bathrooms === "5+") {
    req.body.query.Bathrooms = 5;
  } else {
    req.body.query.Bathrooms = parseInt(req.body.query.Bathrooms);
  }

  req.body.query.AskingPrice = parseFloat(req.body.query.AskingPrice);
  req.body.query.YearBuilt = parseInt(req.body.query.YearBuilt);

  let approved = "Pending";

  if (req.body.query.PhotographyServices) {
    approved = "Pending Photography";
  }

  if (
    req.body.query.PhotographyServices === false &&
    req.body.query.LegalServices.representation
  ) {
    approved = "Pending Legals";
  }

  const submission = new SellerListing({
    sentBy: res.locals.user.email,
    query: req.body.query,
    location: req.body.location,
    approved: approved,
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: res.locals.user.email,
    from: "info@myhomely.io",
    templateId: "d-7dc57eaf719e4f01bd0a8d94965d887f",
    dynamicTemplateData: {
      Street: req.body.query.StreetAddress,
    },
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("SendGrid Email Sent");
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    const savedSubmission = await submission.save();
    res.status(200).send(savedSubmission);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getFormByID = async (req, res) => {
  try {
    await SellerListing.findById(req.body.id, function (err, listing) {
      if (listing) {
        if (listing.approved === "True") {
          res.status(200).send(listing);
        } else {
          res.status(400).send("Form Not Approved");
        }
      } else {
        res.status(400).send(err);
      }
    });
  } catch (err) {} // FIXME
};

exports.getSeller = async (req, res) => {
  try {
    const listing = await SellerListing.find({ sentBy: req.body.email });
    const user = await User.findOne({ email: req.body.email });
    if (listing.length === 0) {
      res.status(400).send("Not A Seller");
    } else {
      res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        icon: user.icon,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        IDVerified: user.IDVerified,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.stripePayment = async (req, res) => {
  console.log(req.body.amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: "cad",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: req.body.email,
  });
  res.status(200).json({ client_secret: paymentIntent["client_secret"] });
};

exports.reportListing = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "contact@myhomely.io",
    from: "info@myhomely.io",
    subject: `${res.locals.user.email} has reported property address ${req.body.address}`,
    html: `Review: ${req.body.address}`,
  };

  sgMail
    .send(msg)
    .then((result) => res.status(200).send("Success"))

    .catch((err) => res.status(400).send(err));
};
