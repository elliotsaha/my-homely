const jwt = require("jsonwebtoken");
const User = require("../../model/User");

async function verifySysAdmin(req, res, next) {
  const token = req.cookies["auth-token"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    const account = await User.findOne({ _id: req.user });

    if (account.role !== "sysadmin") {
      res.status(400).json({
        err: "Not System Administrator",
      });
    }

    res.locals.user = account;
    next();
  } catch (err) {
    res.status(400).json({
      msg: "Not Logged in As System Administrator",
    });
  }
}

module.exports = verifySysAdmin;
