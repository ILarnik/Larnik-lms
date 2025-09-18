 // app.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import cors from "cors";


import { connectDB } from "./src/config/db.js";

// routes
import authRoutes from "./src/Routes/auth.js";
import superAdminRoutes from "./src/Routes/superAdmin.js";
import courseRoutes from "./src/Routes/course.js";
import blogRoutes from "./src/Routes/blog.js";
import financeRoutes from "./src/Routes/finance.js";
import mouRoutes from "./src/Routes/mou.js";
import certificateRoutes from "./src/Routes/certificate.js";
import couponRoutes from "./src/Routes/coupon.js";
import roleManagerRoutes from "./src/Routes/rolemanager.js";
import userRoutes from "./src/Routes/user.js";
import teacherRoutes from "./src/Routes/teacher.js";
import studentRoutes from "./src/Routes/student.js";
import walletRoutes from "./src/Routes/wallet.js";
import careerCellRoutes from "./src/Routes/careerCell.js";
 import reportRoutes from "./src/Routes/reports.js";
import univerityRoutes from "./src/Routes/university.js";
import  referralPartnerRoutes  from "./src/Routes/referralpartner.js";
import contactRoutes from "./src/routes/contactRoutes.js"; // new



// load environment variables
dotenv.config();

// ES Modules __filename & __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow all
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests explicitly
// app.options("*", cors());

// -------------------
// Middlewares
// -------------------
 // JSON parser first

app.use("/api/mou", mouRoutes);
//app.use("/api/courses", courseRoutes);

app.use(express.json({ limit: "2mb" }));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// -------------------
// Database connection
// -------------------
connectDB();

// -------------------
// Health check
// -------------------
app.get("/healthz", (req, res) => res.json({ ok: true }));

// -------------------
// Mount routes
// -------------------
app.use("/api/auth", authRoutes); //done
app.use("/api/superadmin", superAdminRoutes); //DONE
app.use("/api/courses", courseRoutes);
// console.log("✅ superAdminRoutes loaded");
// app.use("/api/courses", courseRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/finance", financeRoutes);
 app.use("/api/mou", mouRoutes);
// app.use("/api/certificates", certificateRoutes);
app.use("/api/certificates", certificateRoutes);
// serve static certificates
app.use("/certificates", express.static(path.join(process.cwd(), "public", "certificates")));

app.use("/signatures", express.static(path.join(process.cwd(), "public", "signatures")));

app.use("/api/coupons", couponRoutes); // done
app.use("/api/rolemanager", roleManagerRoutes);
app.use("/api/users", userRoutes); // done
app.use("/api/student", studentRoutes); // done
// app.get("/api/superadmin/reports", getReports);
app.use("/api/wallet", walletRoutes);
app.use("/api/careercell", careerCellRoutes);
 app.use("/api", reportRoutes);
app.use("/api/university", univerityRoutes);
app.use("/api/referralpartner", referralPartnerRoutes);
app.use("/api/contacts", contactRoutes); // new
// -------------------
// Fallback
// -------------------
app.use((req, res) => res.status(404).json({ message: "Not found test" }));

// -------------------
// Start server
// -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import cors from "cors";

// import { connectDB } from "./src/config/db.js";

// // routes
// import authRoutes from "./src/Routes/auth.js";
// import superAdminRoutes from "./src/Routes/superAdmin.js";
// import courseRoutes from "./src/Routes/course.js";
// import blogRoutes from "./src/Routes/blog.js";
// import financeRoutes from "./src/Routes/finance.js";
// import mouRoutes from "./src/Routes/mou.js";
// import certificateRoutes from "./src/Routes/certificate.js";
// import couponRoutes from "./src/Routes/coupon.js";
// import roleManagerRoutes from "./src/Routes/rolemanager.js";
// import userRoutes from "./src/Routes/user.js";
// import teacherRoutes from "./src/Routes/teacher.js";
// import studentRoutes from "./src/Routes/student.js";
// import walletRoutes from "./src/Routes/wallet.js";
// import careerCellRoutes from "./src/Routes/careerCell.js";
// import reportRoutes from "./src/Routes/reports.js";
// import univerityRoutes from "./src/Routes/university.js";
// import referralPartnerRoutes from "./src/Routes/referralpartner.js";

// // load environment variables
// dotenv.config();

// // ES Modules __filename & __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // -------------------
// // CORS
// // -------------------
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // -------------------
// // Body parsers
// // -------------------
// app.use(express.json({ limit: "50mb" })); // JSON parser first
// app.use(express.urlencoded({ extended: true, limit: "50mb" })); // for form submissions

// // -------------------
// // Serve static uploads
// // -------------------
// app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));
// app.use("/certificates", express.static(path.join(process.cwd(), "public", "certificates")));
// app.use("/signatures", express.static(path.join(process.cwd(), "public", "signatures")));

// // -------------------
// // Database connection
// // -------------------
// connectDB();

// // -------------------
// // Health check
// // -------------------
// app.get("/healthz", (req, res) => res.json({ ok: true }));

// // -------------------
// // Mount routes
// // -------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/superadmin", superAdminRoutes);
// app.use("/api/courses", courseRoutes); // multer handles uploads here
// app.use("/api/teacher", teacherRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/finance", financeRoutes);
// app.use("/api/mou", mouRoutes); // optionally use express-fileupload only here if needed
// app.use("/api/certificates", certificateRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/rolemanager", roleManagerRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/student", studentRoutes);
// app.use("/api/wallet", walletRoutes);
// app.use("/api/careercell", careerCellRoutes);
// app.use("/api", reportRoutes);
// app.use("/api/university", univerityRoutes);
// app.use("/api/referralpartner", referralPartnerRoutes);

// // -------------------
// // Fallback
// // -------------------
// app.use((req, res) => res.status(404).json({ message: "Not found" }));

// // -------------------
// // Start server
// // -------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
