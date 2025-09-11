// // backend/src/utils/uploadMou.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const MOU_DIR = path.join(process.cwd(), "public", "mous");

// // ensure directory exists
// if (!fs.existsSync(MOU_DIR)) fs.mkdirSync(MOU_DIR, { recursive: true });

// const storage = multer.diskStorage({
  
//   destination: (req, file, cb) => {
//     cb(null, MOU_DIR);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const base = path.basename(file.originalname, ext);
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${base}-${unique}${ext}`);
//   }
// });

// function fileFilter(req, file, cb) {
//   const allowed = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/png",
//     "image/jpeg"
//   ];
//   if (!allowed.includes(file.mimetype)) {
//     return cb(new Error("Only PDF/DOC/DOCX/PNG/JPEG allowed"), false);
//   }
//   cb(null, true);
// }

// export const uploadMou = multer({ storage, fileFilter });


// backend/src/utils/uploadMou.js
import multer from "multer";
import path from "path";
import fs from "fs";

const MOU_DIR = path.join(process.cwd(), "public", "mous");

// ensure directory exists
if (!fs.existsSync(MOU_DIR)) fs.mkdirSync(MOU_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, MOU_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg"
  ];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only PDF/DOC/DOCX/PNG/JPEG allowed"), false);
  }
  cb(null, true);
}

export const uploadMou = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20 MB max
});
