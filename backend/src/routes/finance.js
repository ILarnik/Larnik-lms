 import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

import { approveSettlement,getPendingSettlements,rejectSettlement } from "../controllers/financecontroller.js";
 

const router = express.Router();



router.get(
  "/pending-settlements",
  authMiddleware,
  allowRoles("finance_manager", "sub-admin","finance"),
  getPendingSettlements
);

// // Approve settlement (Finance Manager)
// router.post("/approve", authMiddleware, allowRoles("finance_manager","sub-admin"), approveSettlement);

 
// router.post(
//   "/settlement/reject",
//   authMiddleware,
//   allowRoles("finance_manager", "sub-admin"),
//   rejectSettlement
// );
// Manual credit/debit (Finance Manager)
// router.post("/credit", authMiddleware, allowRoles("finance_manager"), creditWallet);
// router.post("/debit", authMiddleware, allowRoles("finance_manager"), debitWallet);


export default router;
