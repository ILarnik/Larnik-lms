// // backend/src/models/mou.js
// import mongoose from "mongoose";

// const mouSchema = new mongoose.Schema(
//   {
//     universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     fileUrl: { type: String, required: true }, // uploaded file path
//     status: {
//       type: String,
//       enum: ["submitted", "approved", "rejected"],
//       default: "submitted",
//     },

//     governance_manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who approved/rejected
//     governanceComment: { type: String }, // optional note

    
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MoU", mouSchema);



// backend/src/models/mou.js
import mongoose from "mongoose";

const mouSchema = new mongoose.Schema(
  {
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    fileUrl: { type: String, required: true }, // uploaded file path
    status: {
      type: String,
      enum: ["submitted", "approved", "rejected"],
      default: "submitted",
    },

    governanceOfficer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    governanceComment: { type: String },

    timestamps: {
      submittedAt: { type: Date, default: Date.now },
      reviewedAt: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("MoU", mouSchema);
