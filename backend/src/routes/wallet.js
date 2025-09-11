 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";
import {  getWallet,  } from "../controllers/walletcontroller.js";
import { requestSettlement, universityApproveSettlement } from "../controllers/walletcontroller.js";

const router = express.Router();

// ======================
// Finance Manager routes
// ======================

// Force credit/debit by finance manager
 
// Teacher requests payout
router.post("/request", authMiddleware, allowRoles("teacher"), requestSettlement);

// ======================
// University routes
// ======================

// University approves teacher settlement and decides teacher share
router.post(
  "/university/approve",
  authMiddleware,
  allowRoles("university"),
  universityApproveSettlement
);

// ======================

// ======================
// Teacher routes
// ======================

// Teacher can view own wallet
router.get("/:teacherId", authMiddleware, allowRoles("teacher", "finance_manager"), getWallet);

export default router;






