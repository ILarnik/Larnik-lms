 import express from "express";
import {
  addJob,
  getJobs,
  addWebinar,
  getWebinars,
  addGuide,
  getGuides,
  getJobsByMode
} from "../controllers/careerCellController.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireSubAdminRole } from "../middleware/rbac.js";

const router = express.Router();

// ✅ Career Cell Routes
router.post("/job", authMiddleware, requireSubAdminRole("career_cell"), addJob);
router.get("/jobs", authMiddleware, getJobs);

// ✅ Webinar Routes
router.post("/webinar", authMiddleware, requireSubAdminRole("career_cell"), addWebinar);
router.get("/webinars", authMiddleware, getWebinars);

// ✅ Guide Routes
router.post("/guide", authMiddleware, requireSubAdminRole("career_cell"), addGuide);
router.get("/guides", authMiddleware, getGuides);

// ✅ Public route: get jobs by mode
router.get("/jobs/mode/:mode", getJobsByMode);


export default router;
