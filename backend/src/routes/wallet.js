 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";
import {
  getWallet,
  requestSettlement,
  universityApproveSettlement,
  creditWallet,
  debitWallet,
} from "../controllers/walletController.js";

import { referralRequestSettlement } from "../controllers/referralPartnerController.js";
import { approveSettlement,rejectSettlement } from "../controllers/financecontroller.js";

const router = express.Router();

// ======================
// Teacher routes
// ======================
router.post("/settlement/request", authMiddleware, allowRoles("teacher"), requestSettlement);
router.post("/settlement/request", authMiddleware, allowRoles("university"), requestSettlement);

router.post("/settlement/approve", authMiddleware, allowRoles("finance_manager","sub-admin"), approveSettlement);
 
router.post(
  "/settlement/reject",
  authMiddleware,
  allowRoles("finance_manager", "sub-admin"),
  rejectSettlement
);


// router.post("/pending-settlements", authMiddleware, allowRoles("finance_manager"), approveSettlement);



router.get(
  "/:ownerId",
  authMiddleware,
  allowRoles("teacher", "finance_manager", "sub-admin","university"),
  getWallet
);

// ======================
// University routes
// ======================
router.post(
  "/university/approve",
  authMiddleware,
  allowRoles("university"),
  universityApproveSettlement
);

// ======================
// Referral partner routes
// ======================
router.post(
  "/referral/request",
  authMiddleware,
  allowRoles("referral"),
  referralRequestSettlement
);

// ======================
// Finance Manager routes
// ======================
router.post("/credit", authMiddleware, allowRoles("finance_manager","sub-admin"), creditWallet);
router.post("/debit", authMiddleware, allowRoles("finance_manager","sub-admin"), debitWallet);

export default router;
