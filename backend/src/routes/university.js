 // src/routes/universityRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/rbac.js";
import {
  getProfile,
  updateProfile,
  getMyCourses,
  reviewTeacherCourse,
  
  enrolledStudents,
  myCertificates,
  getUniversityAnalytics,
   
  exportAnalyticsExcel,
  exportAnalyticsPDF,
  getAffiliatedTeachers,
  getEarnings,
  getTeacherSettlementRequests

} from "../controllers/universitycontroller.js";

import { approveCourse ,deleteCourse} from "../controllers/coursecontroller.js";
import wallet from "../models/wallet.js";
import SettlementRequest from "../models/SettlementRequest.js";
const router = express.Router();

// --- University Profile ---
router.get("/profile", authMiddleware, allowRoles("university"), getProfile);
router.put("/profile", authMiddleware, allowRoles("university"), updateProfile);

// --- University Courses ---
router.get("/my-courses", authMiddleware, allowRoles("university"), getMyCourses);

// --- Review Teacher Courses ---
router.put("/review-course/:courseId", authMiddleware, allowRoles("university"), reviewTeacherCourse);

 

router.get("/AffiliatedTeachers", authMiddleware, allowRoles("university"), getAffiliatedTeachers);


// --- Enrolled Students ---
router.get("/students/:courseId", authMiddleware, allowRoles("university"), enrolledStudents);

// --- Certificates ---
router.get("/certificates", authMiddleware, allowRoles("university"), myCertificates);

router.get("/analytics", authMiddleware, allowRoles("university"), getUniversityAnalytics);
router.get("/analytics/export/excel", exportAnalyticsExcel);
router.get("/analytics/export/pdf", exportAnalyticsPDF);

router.patch(
  "/superadmin/approve/course/:id",
  authMiddleware,
  allowRoles("superadmin", "university"),
  approveCourse
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("teacher", "university", "superadmin"),
  deleteCourse
);

router.get(
  "/earnings/:universityId",
  authMiddleware,
  allowRoles("university"),
  getEarnings
);


router.get("/teacher-requests", authMiddleware, getTeacherSettlementRequests);


export default router;
