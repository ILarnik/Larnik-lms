//  import express from "express";
// import { authMiddleware } from "../middleware/auth.js";
// import { allowRoles } from "../middleware/rbac.js";
// import {
//   getWallet,
//   requestSettlement,
//   universityApproveSettlement,
//   creditWallet,
//   debitWallet,
// } from "../controllers/walletController.js";

// import { referralRequestSettlement } from "../controllers/referralPartnerController.js";
// import { approveSettlement,rejectSettlement } from "../controllers/financecontroller.js";

// const router = express.Router();

// // ======================
// // Teacher routes
// // ======================
// router.post("/settlement/request", authMiddleware, allowRoles("teacher"), requestSettlement);
// router.post("/settlement/request", authMiddleware, allowRoles("university"), requestSettlement);

// router.post("/settlement/approve", authMiddleware, allowRoles("finance_manager","sub-admin"), approveSettlement);
 
// router.post(
//   "/settlement/reject",
//   authMiddleware,
//   allowRoles("finance_manager", "sub-admin"),
//   rejectSettlement
// );


// // router.post("/pending-settlements", authMiddleware, allowRoles("finance_manager"), approveSettlement);



// router.get(
//   "/:ownerId",
//   authMiddleware,
//   allowRoles("teacher", "finance_manager", "sub-admin","university"),
//   getWallet
// );

// // ======================
// // University routes
// // ======================
// router.post(
//   "/university/approve",
//   authMiddleware,
//   allowRoles("university"),
//   universityApproveSettlement
// );

// // ======================
// // Referral partner routes
// // ======================
// router.post(
//   "/referral/request",
//   authMiddleware,
//   allowRoles("referral"),
//   referralRequestSettlement
// );

// // ======================
// // Finance Manager routes
// // ======================
// router.post("/credit", authMiddleware, allowRoles("finance_manager","sub-admin"), creditWallet);
// router.post("/debit", authMiddleware, allowRoles("finance_manager","sub-admin"), debitWallet);

// export default router;



// routes/settlementRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

import {
  teacherRequestSettlement,
  universityApproveSettlement,
  universityRequestSettlement,
  referralRequestSettlement,
  financeApproveSettlement,
    getWallet,
 
} from "../controllers/walletcontroller.js";

 
import{
  rejectSettlement
}
from "../controllers/financecontroller.js";
const router = express.Router();

// ======================
// Teacher routes
// ======================
router.post(
  "/teacher/request",
  authMiddleware,
  allowRoles("teacher"),
  teacherRequestSettlement
);

// ======================
// University routes
// ======================
router.post(
  "/university/request",
  authMiddleware,
  allowRoles("university"),
  universityRequestSettlement
);

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
router.post(
  "/finance/approve",
  authMiddleware,
  allowRoles("finance_manager", "sub-admin"),
  financeApproveSettlement
);

router.post(
  "/finance/reject",
  authMiddleware,
  allowRoles("finance_manager", "sub-admin"),
 referralRequestSettlement
);
  
// router.post(
//   "/finance/credit",
//   authMiddleware,
//   allowRoles("finance_manager", "sub-admin"),
//   creditWallet
// );

// router.post(
//   "/finance/debit",
//   authMiddleware,
//   allowRoles("finance_manager", "sub-admin"),
//   debitWallet
// );

// ======================
// Common route to get wallet
// ======================
router.get(
  "/wallet/:ownerId",
  authMiddleware,
  allowRoles("teacher", "university", "referral", "finance_manager", "sub-admin"),
  getWallet
);

export default router;
