 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";
import { requestSettlement, universityApproveSettlement } from "../controllers/walletcontroller.js";
import { approveSettlement } from "../controllers/financeController.js";

const router = express.Router();

// ======================
// Teacher routes
// ======================

// Teacher requests payout
router.post("/request", authMiddleware, allowRoles("teacher"), requestSettlement);

// ======================
// University routes
// ======================

// University approves teacher settlement
router.post(
  "/university/approve",
  authMiddleware,
  allowRoles("university"),
  universityApproveSettlement
);

// ======================
// Finance Manager routes
// ======================

// Finance manager approves final payout
router.post("/approve", authMiddleware, allowRoles("finance_manager"), approveSettlement);

export default router;
