 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

import { approveSettlement } from "../controllers/financeController.js";
import {
  creditWallet,
  debitWallet,
} from "../controllers/walletcontroller.js";

const router = express.Router();

// ======================
// Finance Manager routes
// ======================

// ✅ Approve settlement (teacher, university, referral)
//    - Teachers/Universities still work with teacherId
//    - Referral partners pass ownerId + ownerType="referral"
router.post("/approve", authMiddleware, allowRoles("finance_manager"), approveSettlement);

// ✅ Force credit/debit (manual action by Finance Manager)
router.post("/credit", authMiddleware, allowRoles("finance_manager"), creditWallet);
router.post("/debit", authMiddleware, allowRoles("finance_manager"), debitWallet);

export default router;
