 // backend/src/routes/mou.js
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { requireApproved, requireDynamicSubRole, allowRoles,requireSubAdminRole } from "../middleware/rbac.js";
import { uploadMou } from "../utils/uploadMou.js";
import {
  uploadMouFile,
  approveMou,
  rejectMou,
  downloadMouFile,
  getMous,
} from "../controllers/mouController.js";

const router = express.Router();

/**
 * 1. University uploads MoU
 */
router.post(
  "/upload",
  uploadMou.single("mouFile"),   // 🔥 Multer FIRST
  authMiddleware,
  allowRoles("university"),
  requireApproved(),
  uploadMouFile
);

// router.post("/test-upload", uploadMou.single("mouFile"), (req, res) => {
//   console.log("working");
  
//   if (!req.file) return res.status(400).json({ message: "No file" });
//   res.json({ success: true, file: req.file });
// });

/**
 * 2. Governance Manager (sub-admin) downloads MoU
 */
router.get(
  "/:id/download",
  authMiddleware,
  requireSubAdminRole("governance"), // must be sub-admin with this dynamic role
  downloadMouFile
);

/**
 * 3. Governance Manager approves MoU
 */
router.post(
  "/:id/approve",
  authMiddleware,
  requireSubAdminRole("governance"),
  requireApproved(),
  approveMou
);

/**
 * 4. Governance Manager rejects MoU
 */
router.post(
  "/:id/reject",
  authMiddleware,
  requireSubAdminRole("governance"),
  requireApproved(),
  rejectMou
);

/**
 * 5. List MoUs (University sees own uploads, Governance Manager sees all)
 */
router.get(
  "/",
  authMiddleware,
  requireApproved(),
  getMous
);

export default router;
