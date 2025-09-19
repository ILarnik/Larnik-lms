import multer from "multer";
import path from "path";
import fs from "fs";

// Helper: create folder if not exists
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Storage configuration
const storage = (type = "general") =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = path.join("uploads", type);
      ensureFolderExists(folder);
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  });

// Filter by allowed file types
const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

// Export middleware for different types
export const uploadVideo = multer({
  storage: storage("videos"),
  fileFilter: fileFilter(["video/mp4", "video/mkv", "video/avi"]),
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB max
});

export const uploadNotes = multer({
  storage: storage("notes"),
  fileFilter: fileFilter([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

export const uploadAny = (folder = "general", allowedTypes = []) =>
  multer({
    storage: storage(folder),
    fileFilter:
      allowedTypes.length > 0
        ? fileFilter(allowedTypes)
        : (req, file, cb) => cb(null, true), // ✅ allow all
    limits: { fileSize: 100 * 1024 * 1024 },
  });
