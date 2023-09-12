const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

const {
getChatList,
getMessageList,
} = require("../controllers/chatBoxMessages");

router.post("/getChatList", verify, getChatList);
router.post("/getMessageList", verify, getMessageList);
module.exports = router;
