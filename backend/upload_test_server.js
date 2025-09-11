// upload_test_server.js
import express from "express";
import { uploadMou } from "./src/utils/uploadMou.js"; // adjust path if needed

const app = express();

app.post("/test-upload", (req, res) => {
  // call multer explicitly and handle errors so we can log them
  uploadMou.single("mouFile")(req, res, (err) => {
    console.log("=== test-upload invoked ===");
    console.log("headers:", req.headers["content-type"], "len:", req.headers["content-length"]);
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ success: false, message: err.message, code: err.code || null });
    }
    if (!req.file) {
      console.warn("No file in req.file");
      return res.status(400).json({ success: false, message: "No file uploaded (req.file missing)" });
    }
    console.log("Saved file:", req.file.path, req.file.size);
    res.json({ success: true, file: req.file });
  });
});

app.listen(5001, () => console.log("Test upload server listening on http://localhost:5001"));
