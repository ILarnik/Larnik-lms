import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Revenue", "Enrollment", "Analytics"],
      required: true,
    },
    filters: {
      startDate: Date,
      endDate: Date,
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // SuperAdmin
      required: true,
    },
    format: {
      type: String,
      enum: ["pdf", "excel", "word"],
      default: "pdf",
    },
    fileUrl: {
      type: String, // local path or cloud URL
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
