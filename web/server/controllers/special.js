const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login
exports.login = async (req, res) => {
  // Check If Email Exists in Database
  if (req.body.email !== "verify@myhomely.io") {
    return res.status(400).send("Auth Denied");
  }

  const user = await User.findOne({ email: req.body.email });

  // Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass)
    return res.status(400).json({
      errType: "password",
      msg: "Invalid Password",
    });

  // Create and Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "2d",
  });

  console.log(token);
  res
    .cookie("auth-token", token, {
      domain: process.env.LOCAL,
      path: "/",
    })
    .status(200)
    .send("Success");
};
