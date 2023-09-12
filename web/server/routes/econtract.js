const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const verifySysAdmin = require("../middleware/admin/verifySysAdmin");

const {
  submitInitialForm,
  getFormByID,
  decline,
  accept,
  getLink,
  counterOffer,
  sellerCounterOffer,
  getSellerContracts,
  getBuyerContracts,
} = require("../controllers/econtract");

router.post("/submitInitialForm", verify, submitInitialForm);
router.post("/getFormByID", verify, getFormByID);
router.post("/decline", verify, decline);
router.post("/accept", verify, accept);
router.post("/getLink", getLink);
router.post("/counterOffer", verify, counterOffer);
router.post("/sellerCounterOffer", sellerCounterOffer);
router.get("/getSellerContracts", verify, getSellerContracts);
router.get("/getBuyerContracts", verify, getBuyerContracts);
module.exports = router;
