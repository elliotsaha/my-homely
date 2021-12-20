const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/admin/verifyAdmin");

// Authentication Controller
const {
  register,
  login,
  checkIfLogged,
  forgotPassword,
  resendConfirmEmail,
  resendSMSVerification,
  resetPassword,
  logout,
  emailconfirmation,
  googleLogin,
  deleteAccount,
  facebookLogin,
  phoneconfirmation,
  getNameFromEmail,
  googleSignup,
  facebookSignup,
  changeProfile,
  getUnapprovedIDs,
  approveID,
  denyID,
  getProfileTracker,
  requestAccountData,
  registerCheck,
  facebookCheck,
  googleCheck,
} = require("../controllers/auth");

router.post("/registerCheck", registerCheck);
router.post("/register", register);
router.post("/login", login);
router.get("/resendConfirmEmail", verify, resendConfirmEmail);
router.get("/resendSMSVerification", verify, resendSMSVerification);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/logout", logout);
router.post("/emailconfirmation", emailconfirmation);
router.post("/phoneconfirmation", phoneconfirmation);
router.post("/googlelogin", googleLogin);
router.post("/facebooklogin", facebookLogin);
router.get("/deleteaccount", verify, deleteAccount);
router.post("/checkiflogged", checkIfLogged);
router.post("/getNameFromEmail", getNameFromEmail);
router.post("/facebookSignup", facebookSignup);
router.post("/googleSignup", googleSignup);
router.post("/changeProfile", verify, changeProfile);
router.get("/getUnapprovedIDs", verifyAdmin, getUnapprovedIDs);
router.post("/approveID", verifyAdmin, approveID);
router.post("/denyID", verifyAdmin, denyID);
router.post("/getPorfileTracker",verify, getProfileTracker)

router.get("/requestAccountData", verify, requestAccountData);
router.post("/facebookCheck", facebookCheck);
router.post("/googleCheck", googleCheck);
module.exports = router;
