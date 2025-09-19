 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

import {  getPendingSettlements  } from "../controllers/financecontroller.js";
 

const router = express.Router();



router.get(
  "/pending-settlements",
  authMiddleware,
  allowRoles("finance_manager", "sub-admin","finance"),
  getPendingSettlements
);

 

export default router;
