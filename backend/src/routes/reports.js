 // src/routes/reportRoutes.js
import express from "express";
import {
  createReport,
  getReports,
  downloadReport,
  deleteReport,
} from "../controllers/reportController.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";

const router = express.Router();

// Create new report (Super Admin only)
router.post(
  "/report",
  authMiddleware,
  allowRoles("superadmin"),
  createReport
);

// Get all reports (Super Admin only)
router.get(
  "/report",
  authMiddleware,
  allowRoles("superadmin"),
  getReports
);

// Download report by ID (Super Admin only)
router.get(
  "/report/:id/download",
  authMiddleware,
  allowRoles("superadmin"),
  downloadReport
);

// Delete report by ID (Super Admin only)
router.delete(
  "/report/:id",
  authMiddleware,
  allowRoles("superadmin"),
  deleteReport
);

export default router;
