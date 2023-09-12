const request = require("superagent");
const User = require("../model/User");
const sgMail = require("@sendgrid/mail");
const SellerListing = require("../model/SellerForm");
const EContract = require("../model/EContract");
const axios = require("axios");
const moment = require("moment");

exports.submitInitialForm = async (req, res) => {
  const listing = await SellerListing.findById(req.body.propertyId);
  let query = [];
  query.push({ ...req.body.query, sentFrom: res.locals.user });

  await axios.post(
    "https://api.pipedrive.com/v1/leads?api_token=c7c81aac59d171c6056a338df03ad2b6b0ec5a9f",
    {
      title: `${res.locals.user.name} Has Signed Up For An E-Contract`,
      person_id: res.locals.user.pipeDriveId,
    }
  );

  const submission = new EContract({
    offerList: query,
    buyerEmail: res.locals.user.email,
    sellerEmail: listing.sentBy,
    propertyUUID: req.body.propertyId,
  });

  try {
    const savedSubmission = await submission.save();
    res.status(200).send(savedSubmission);
    console.log(savedSubmission._id);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: listing.sentBy,
      from: "info@myhomely.io",
      subject: "Econtract submission",
      html: `${res.locals.user.name} has sent you an e-contract, <a href=${process.env.CLIENT_URL}/user/account>View Offer</a>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Sent");
      })
      .catch((err) => console.log("ERROR", err.response.body));
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.counterOffer = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    let data = { ...req.body.data, sentFrom: res.locals.user };

    EContract.findByIdAndUpdate(
      req.body.id,
      {
        $push: {
          offerList: data,
        },
      },
      function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
          if (req.body.type === "seller") {
            const buyerEmail = result.buyerEmail;
            const msg = {
              to: buyerEmail,
              from: "info@myhomely.io",
              subject: "Your EContract has been Counter Offered",
              html: `Your Econtract has been Counter Offered. <a href=${process.env.CLIENT_URL}/buyerViewContract?id=${result._id}>Click Here to view</a>`,
            };
            sgMail
              .send(msg)
              .then(() => {
                res.status(200).send("Success");
                console.log("Sent");
              })
              .catch((err) => console.log(err));
          } else {
            const sellerEmail = result.sellerEmail;
            const msg = {
              to: sellerEmail,
              from: "info@myhomely.io",
              subject: "Your EContract has been Counter Offered",
              html: `Your Econtract has been Counter Offered. <a href=${process.env.CLIENT_URL}/user/account>Click Here to view</a>`,
            };
            sgMail
              .send(msg)
              .then(() => {
                res.status(200).send("Success");
                console.log("Sent");
              })
              .catch((err) => console.log(err));
          }
        }
      }
    );
  } catch (err) {
    res.status(400).send("error");
  }
};

exports.sellerCounterOffer = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    EContract.findByIdAndUpdate(
      req.body.id,
      {
        $push: {
          buyerSubmissions: req.body.data,
        },
      },
      function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
          const buyerEmail = result.buyerEmail;
          const msg = {
            to: buyerEmail,
            from: "info@myhomely.io",
            subject: "Your EContract has been Counter Offered",
            html: `Your Econtract has been Counter Offered. <a href=${process.env.CLIENT_URL}/buyerViewContract?id=${result._id}>Click Here to view</a>`,
          };
          sgMail
            .send(msg)
            .then(() => {
              res.status(200).send("Success");
              console.log("Sent");
            })
            .catch((err) => console.log(err));
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getFormByID = async (req, res) => {
  try {
    const Form = await EContract.findById(req.body.id);
    res.status(200).send(Form);
  } catch (err) {
    res.status(400).send("error");
  }
};

exports.decline = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    EContract.findByIdAndUpdate(
      req.body.id,
      { cancelled: true },
      function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
        }
      }
    );
    const Form = await EContract.findById(req.body.id);
    if (req.body.type === "seller") {
      const buyerEmail = Form.buyerEmail;
      const msg = {
        to: buyerEmail,
        from: "info@myhomely.io",
        subject: "Econtract declined",
        html: `Your Econtract has been declined`,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.status(200).send("Success");
          console.log("Sent");
        })
        .catch((err) => console.log(err));

      console.log(req.body.id);
      const DeleteDoc = await EContract.findOneAndRemove({ _id: req.body.id });
    } else {
      const sellerEmail = Form.sellerEmail;
      const msg = {
        to: sellerEmail,
        from: "info@myhomely.io",
        subject: "Econtract declined",
        html: `Your Econtract has been declined`,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.status(200).send("Success");
          console.log("Sent");
        })
        .catch((err) => console.log(err));
    }
    console.log(req.body.id);
    const DeleteDoc = await EContract.findOneAndRemove({ _id: req.body.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.accept = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const Form = await EContract.findById(req.body.id);

    await EContract.findByIdAndUpdate(req.body.id, {
      $push: {
        agreedQuery: Form.offerList[Form.offerList.length - 1],
      },
    });

    if (req.body.type === "seller") {
      const buyerEmail = Form.buyerEmail;
      console.log(Form._id);
      const msg = {
        to: buyerEmail,
        from: "info@myhomely.io",
        subject: "Your Offer has been accepted",
        html: `<a href=${process.env.CLIENT_URL}/econtract/acceptListing?order=0&id=${Form._id}>Click here to sign</a>`,
      };
      sgMail.send(msg).then(() => {
        res.status(200).send("Success");
        console.log("Sent ACCEPTED EMAIL");
      });
    } else {
      const sellerEmail = Form.sellerEmail;

      console.log(Form._id);
      const msg = {
        to: sellerEmail,
        from: "info@myhomely.io",
        subject: "Your Offer has been accepted",
        html: `<a href=${process.env.CLIENT_URL}/econtract/acceptListing?order=1&id=${Form._id}>Click here to sign</a>`,
      };
      sgMail.send(msg).then(() => {
        res.status(200).send("Success");
        console.log("Sent ACCEPTED EMAIL");
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getLink = async (req, res) => {
  const u = req.body;
  const a = req.body.form.agreedQuery[0];
  const startCondition3 = moment(new Date());
  const endCondition3 = moment(a.survey.date);
  const durationCondition3 = moment
    .duration(startCondition3.diff(endCondition3))
    .asDays();
  axios
    .post(
      "https://api.eversign.com/api/document?access_key=f3731e7699b4116a9f202c73ae75f953&business_id=291667",
      {
        sandbox: 1,
        template_id: "4268b12dd5f04526a6af78a728f82837",
        embedded_signing_enabled: 1,
        signers: req.body.signers,
        fields: [
          {
            identifier: "buyer__initName",
            value: u.signers[0].name,
          },
          {
            identifier: "seller__initName",
            value: u.signers[1].name,
          },
          {
            identifier: "buyer__location",
            value: "Toronto, ON, Canada",
          },
          {
            identifier: "seller__location",
            value: "Toronto, ON, Canada",
          },
          {
            identifier: "location__description",
            value: u.property.StreetAddress,
          },
          {
            identifier: "property__fixtures",
            value: `Garage Spaces: ${u.property.query.GarageSpaces}, Parking Spaces: ${u.property.query.ParkingSpaces}, Bedrooms: ${u.property.query.Bedrooms}, Bathrooms: ${u.property.query.Bathrooms}`,
          },
          {
            identifier: "property__improvements",
            value: "No Property Improvements",
          },
          {
            identifier: "buyer__initials",
            value: u.buyerInitials.initials,
          },
          {
            identifier: "buyer__initials2",
            value: u.buyerInitials.initials,
          },
          {
            identifier: "buyer__initials3",
            value: u.buyerInitials.initials,
          },
          {
            identifier: "buyer__initials4",
            value: u.buyerInitials.initials,
          },
          {
            identifier: "buyer__initials5",
            value: u.buyerInitials.initials,
          },
          {
            identifier: "seller__initials",
            value: u.sellerInitials.initials,
          },
          {
            identifier: "seller__initials2",
            value: u.sellerInitials.initials,
          },
          {
            identifier: "seller__initials3",
            value: u.sellerInitials.initials,
          },
          {
            identifier: "seller__initials4",
            value: u.sellerInitials.initials,
          },
          {
            identifier: "seller__initials5",
            value: u.sellerInitials.initials,
          },
          {
            identifier: "property__purchasePrice",
            value: a.OfferDetails.salesPrice,
          },
          {
            identifier: "property__deposit",
            value: a.OfferDetails.trustAccount,
          },
          {
            identifier: "deposit__month",
            value: "Dec",
          },
          {
            identifier: "deposit__day",
            value: "2",
          },
          {
            identifier: "deposit__year__lastTwo",
            value: "21",
          },
          {
            identifier: "property__cashback",
            value: (a.cashBack / 100) * a.OfferDetails.salesPrice,
          },
          {
            identifier: "property__closingDateMonth",
            value: moment(a.OfferDetails.daysForTransactionToClose).format(
              "MMM"
            ),
          },

          {
            identifier: "property__closingDateDay",
            value: moment(a.OfferDetails.daysForTransactionToClose).format("d"),
          },
          {
            identifier: "property__closingDateYearLastTwo",
            value: moment(a.OfferDetails.daysForTransactionToClose).format(
              "YY"
            ),
          },

          {
            identifier: "conditionCheck__1",
            value: 0,
          },
          {
            identifier: "conditionCheck__2",
            value: 0,
          },
          {
            identifier: "conditionCheck__3",
            value: 0,
          },
          {
            identifier: "conditionCheck__4",
            value: a.survey.boolean ? 1 : 0,
          },
          {
            identifier: "conditionCheck__5",
            value: 1,
          },
          {
            identifier: "conditionCheck__6",
            value: 1,
          },
          {
            identifier: "condition1Text",
            value: "N/A",
          },
          {
            identifier: "condition2Text",
            value: "N/A",
          },
          {
            identifier: "condition3Text",
            value: a.survey.boolean ? durationCondition3 : "N/A",
          },
          {
            identifier: "condition4Text",
            value: "3",
          },
          {
            identifier: "condition5Text",
            value: "2",
          },
          {
            identifier: "buyer__name",
            value: u.signers[0].name,
          },
          {
            identifier: "buyer__name2",
            value: u.signers[0].name,
          },
          {
            identifier: "buyer__address",
            value: "11606 hawkings ave.",
          },
          {
            identifier: "buyer__address2",
            value: "11606 hawkings ave.",
          },
          {
            identifier: "buyer__mobile",
            value: "7809128262",
          },
          {
            identifier: "buyer__mobile2",
            value: "7809128262",
          },
          {
            identifier: "buyer__email",
            value: u.signers[0].email,
          },
          {
            identifier: "buyer__email2",
            value: u.signers[0].email,
          },
          {
            identifier: "seller__name",
            value: u.signers[1].name,
          },
          {
            identifier: "seller__address",
            value: "11702 hawkings ave.",
          },
          {
            identifier: "seller__mobile",
            value: "912323822",
          },
          {
            identifier: "seller__email",
            value: u.signers[1].email,
          },
          {
            identifier: "seller__name2",
            value: u.signers[1].name,
          },
          {
            identifier: "seller__address2",
            value: "11702 hawkings ave.",
          },
          {
            identifier: "seller__mobile2",
            value: "912323822",
          },
          {
            identifier: "seller__email2",
            value: u.signers[1].email,
          },

          {
            identifier: "acceptance__month",
            value: moment(a.OfferDetails.daysForTransactionToClose).format(
              "MMM"
            ),
          },
          {
            identifier: "acceptance__day",
            value: moment(a.OfferDetails.daysForTransactionToClose).format("d"),
          },
          {
            identifier: "acceptance__yearLastTwo",
            value: moment(a.OfferDetails.daysForTransactionToClose).format(
              "YY"
            ),
          },
          {
            identifier: "acceptance__toPurchaseCheck",
            value: 1,
          },
        ],
      }
    )
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getSellerContracts = async (req, res) => {
  try {
    const email = res.locals.user.email;
    const econtract = await EContract.find({
      sellerEmail: email,
      "agreedQuery.0": { $exists: false },
    });

    let copy = [...econtract];
    let returnArr = [];

    for (let i = 0; i < copy.length; i++) {
      const property = await SellerListing.findById(copy[i].propertyUUID);
      copy[i] = { ...copy[i], property };
      let nested = {
        property: copy[i].property,
        econtract: copy[i]._doc,
      };
      returnArr.push(nested);
    }

    console.log(copy);
    res.status(200).send(returnArr);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

exports.getBuyerContracts = async (req, res) => {
  try {
    const email = res.locals.user.email;
    const econtract = await EContract.find({
      buyerEmail: email,
      "agreedQuery.0": { $exists: false },
    });

    let copy = [...econtract];
    let returnArr = [];

    for (let i = 0; i < copy.length; i++) {
      const property = await SellerListing.findById(copy[i].propertyUUID);
      copy[i] = { ...copy[i], property };
      let nested = {
        property: copy[i].property,
        econtract: copy[i]._doc,
      };
      returnArr.push(nested);
    }
    console.log(copy);
    res.status(200).send(returnArr);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};
