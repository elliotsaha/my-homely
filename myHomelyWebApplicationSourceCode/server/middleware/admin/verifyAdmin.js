const jwt = require("jsonwebtoken");
const User = require("../../model/User");

async function verifyAdmin(req, res, next) {
  const token = req.cookies["auth-token"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const account = await User.findOne({ _id: verified });

    if (account.role === "user")
      return res.status(400).json({ err: "Not Administrator" });

    res.locals.user = account;
    next();
  } catch (err) {
    res.status(400).json({
      msg: "Not Logged in As Administrator",
    });
  }
}

module.exports = verifyAdmin;
