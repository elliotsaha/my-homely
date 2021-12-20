const express = require("express");
const router = express.Router();

const { login } = require("../controllers/special");

router.post("/login", login);

module.exports = router;
