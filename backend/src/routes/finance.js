 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

import { approveSettlement } from "../controllers/financeController.js";
import{
    creditWallet,debitWallet
}from "../controllers/walletcontroller.js";

const router = express.Router();

// ======================
// Teacher routes
// ======================

 
// Finance Manager routes
// ======================

// Finance manager approves final payout (applies platform cut)
router.post("/approve", authMiddleware, allowRoles("sub-admin"), approveSettlement);




// Force credit/debit by finance manager
router.post("/credit", authMiddleware, allowRoles("finance_manager"), creditWallet);
router.post("/debit", authMiddleware, allowRoles("finance_manager"), debitWallet);


export default router;
