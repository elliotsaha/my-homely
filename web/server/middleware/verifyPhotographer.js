const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function verifyPhotographer(req, res, next) {
  const token = req.cookies["auth-token"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const account = await User.findOne({ _id: verified });

    if (account.role !== "photography" && account.role !== "CallCenter")
      return res.status(400).json({ err: "Not Photographer" });

    res.locals.user = account;
    next();
  } catch (err) {
    res.status(400).json({
      msg: "Not Logged in As Photographer",
    });
  }
}

module.exports = verifyPhotographer;
