 import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["credit", "debit", "settlement_request"],
    default: "credit",
  },
   status: {
  type: String,
  enum: [
    "pending",
    "approved",
    "rejected",
    "pending_university",
    "approved_by_university",
    "approved_by_finance" // <-- ADD THIS
  ],
    default: "pending",
  },
  split: {
    teacher: { type: Number, default: 100 },
    university: { type: Number, default: 0 },
    platform: { type: Number, default: 0 },
  },
  date: { type: Date, default: Date.now },
  note: { type: String },
  referralPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  originalTeacherTransactionId: { type: mongoose.Schema.Types.ObjectId },
});

const walletSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    ownerType: {
      type: String,
      enum: ["teacher", "university", "referral"],
      required: true,
    },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },
    balance: { type: Number, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

// Middleware to sync teacherId for backward compatibility
walletSchema.pre("save", function (next) {
  if (this.ownerType === "teacher" && !this.teacherId) {
    this.teacherId = this.ownerId;
  }
  next();
});

export default mongoose.model("Wallet", walletSchema);
