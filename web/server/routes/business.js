const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/admin/verifyAdmin");
const verifySysAdmin = require("../middleware/admin/verifySysAdmin");
const verifyPhotographer = require("../middleware/verifyPhotographer");
const verifyLawyer = require("../middleware/verifyLawyer");
// Business Route controllers
const verify = require("../middleware/verifyToken");

const {
  changeRole,
  getAllAdmin,
  getAllUsers,
  removeAdmin,
  banUser,
  getAllLawyers,
  getAllPhotographyers,
  submitPropertyPhotos,
  submitLegalDocuments,
  unsubscribeFromEmails,
} = require("../controllers/business");

router.post("/banUser", verifyAdmin, banUser);
router.post("/removeAdmin", verifySysAdmin, removeAdmin);
router.post("/changeRole", verifySysAdmin, changeRole);
router.post("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getAllAdmin", verifySysAdmin, getAllAdmin);
router.get("/getAllPhotographyers", verifySysAdmin, getAllPhotographyers);
router.get("/getAllLawyers", verifySysAdmin, getAllLawyers);
router.post("/submitPropertyPhotos", submitPropertyPhotos);
router.post("/submitLegalDocuments", verifyLawyer, submitLegalDocuments);
router.get("/unsubscribeFromEmails", verify, unsubscribeFromEmails);
module.exports = router;
