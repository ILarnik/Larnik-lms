 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";
import { creditWallet, getWallet, debitWallet } from "../controllers/walletcontroller.js";

const router = express.Router();

// Only admin can force credit/debit
router.post("/credit", authMiddleware, allowRoles("finance_manager"), creditWallet);
router.post("/debit", authMiddleware, allowRoles("finance_manager"), debitWallet);

// Teacher can view own wallet
router.get("/:teacherId", authMiddleware, allowRoles("teacher", "finance_manager"), getWallet);

export default router;
