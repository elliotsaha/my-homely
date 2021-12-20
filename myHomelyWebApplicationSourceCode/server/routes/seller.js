const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/admin/verifyAdmin");
const verifyPhotographer = require("../middleware/verifyPhotographer");
// Seller Route controllers
const {
  changeForm,
  submitForm,
  viewMyListings,
  viewUserListings,
  deleteForm,
  viewUnapprovedListings,
  viewApprovedListings,
  approveListing,
  disapproveListing,
  getFormByID,
  getSeller,
  stripePayment,
  viewNeedPhotography,
  viewNeedLegals,
  viewAllListings,
  reportListing,
} = require("../controllers/seller");

router.get("/viewUnapprovedListings", verifyAdmin, viewUnapprovedListings);
router.get("/viewNeedPhotography", verifyPhotographer, viewNeedPhotography);
router.get("/viewApprovedListings", viewApprovedListings);
router.get("/viewAllListings", verifyAdmin, viewAllListings);
router.post("/approveListing", verifyAdmin, approveListing);
router.post("/disapproveListing", verifyAdmin, disapproveListing);
router.get("/viewMyListings", verify, viewMyListings);
router.get("/viewNeedLegals", verify, viewNeedLegals);
router.post("/viewUserListings", verifyAdmin, viewUserListings);
router.post("/changeForm", verify, changeForm);
router.post("/submitForm", verify, submitForm);
router.post("/deleteForm", verify, deleteForm);
router.post("/getFormByID", getFormByID);
router.post("/getSeller", getSeller);
router.post("/stripePayment", stripePayment);
router.post("/reportListing", verify, reportListing);
module.exports = router;
