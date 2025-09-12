import mongoose from "mongoose";

// ================== Applicant Sub-Schema ==================
const applicantSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeLink: { type: String },
  appliedAt: { type: Date, default: Date.now }
});

// ================== Job / Internship Schema ==================
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String },
    description: { type: String },
    eligibility: { type: String },
    location: { type: String },
    tags: [String],
    mode: { 
      type: String, 
      enum: ["Full-time", "Part-time", "Internship", "Remote", "Onsite"], 
      default: "Internship" 
    },
    salary: { type: String },
    deadline: { type: Date },
    jdFile: { type: String }, // optional JD file upload
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicants: [applicantSchema]
  },
  { timestamps: true }
);

// ================== Webinar Schema ==================
const webinarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    speaker: { type: String },
    datetime: { type: Date, required: true },
    mode: { 
      type: String, 
      enum: ["Zoom", "Google Meet", "Offline"], 
      default: "Zoom" 
    },
    link: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);



// ================== Guide Schema ==================
 
 // ================== Guide Schema ==================
 

const guideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g. Resume, Interview, Career Tips
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Guide = mongoose.model("Guide", guideSchema);

// ================== Model Exports ==================
export const Job = mongoose.model("Job", jobSchema);
export const Webinar = mongoose.model("Webinar", webinarSchema);

