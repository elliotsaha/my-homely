const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

const {
  search,
  searchCards,
  setFavourite,
  removeFavourite,
  getFavourites,
  sendShowingTime,
  acceptShowingTimeReq,
  denyShowingTimeReq,
} = require("../controllers/buyer");

router.post("/search", search);
router.post("/searchCards", searchCards);
router.post("/setFavourite", verify, setFavourite);
router.post("/removeFavourite", verify, removeFavourite);
router.get("/getFavourites", verify, getFavourites);
router.post("/sendShowingTime", verify, sendShowingTime);

router.get("/acceptShowingTimeReq", verify, acceptShowingTimeReq);
router.get("/denyShowingTimeReq", verify, denyShowingTimeReq);

module.exports = router;
