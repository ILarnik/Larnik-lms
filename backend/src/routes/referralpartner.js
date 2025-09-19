 // routes/referralPartnerRoutes.js
import express from "express";
import {
  getProfile,
  myReferrals,
  myEarnings,
  updateReferralProfile
  // requestSettlement,
} from "../controllers/referralpartnercontroller.js"; // fixed casing for import
import {  referralRequestSettlement} from "../controllers/walletcontroller.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

const router = express.Router();

// All referral partner endpoints protected
router.get("/profile", authMiddleware, allowRoles("referral"), getProfile);
router.get("/my-referrals", authMiddleware, allowRoles("referral"), myReferrals);
router.get("/earnings", authMiddleware, allowRoles("referral"), myEarnings);
router.post("/settlement", authMiddleware, allowRoles("referral"),  referralRequestSettlement);
router.put("/profile", authMiddleware, allowRoles("referral"), updateReferralProfile);

export default router;
