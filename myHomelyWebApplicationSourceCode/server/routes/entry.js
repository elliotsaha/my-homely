const router = require("express").Router();
const axios = require("axios");
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
  "GvYb0Wdr1Iw6KiucJ_mwzA"
);

router.get("/", function (req, res, next) {
  res.json({
    status: res.statusCode,
    message:
      "The myHomely API is currently running. This endpoint is specifically for testing whether this API is currently functioning or not",
  });
});

module.exports = router;
