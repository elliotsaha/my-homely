const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function verifySpecial(req, res, next) {
  const token = req.cookies["auth-token"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const account = await User.findOne({ _id: verified });

    if (account.email !== "verify@myhomely.io")
      return res.status(400).send("Access Denied");

    res.locals.user = account;
    next();
  } catch (err) {
    res.status(400).send("Access Denied");
  }
}

module.exports = verifySpecial;
