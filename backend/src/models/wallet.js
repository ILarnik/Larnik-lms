 



// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   amount: { type: Number, required: true },
//   type: { 
//     type: String, 
//     enum: ["credit", "debit", "settlement_request"], // add settlement_request
//     default: "credit" 
//   },
//   status: { 
//     type: String, 
//     enum: ["pending", "approved", "rejected"], 
//     default: "pending" // only used for settlement_request
//   },
//   split: { // dynamic split percentages
//     teacher: { type: Number, default: 100 },
//     university: { type: Number, default: 0 },
//     platform: { type: Number, default: 0 }
//   },
//   date: { type: Date, default: Date.now },
//   note: { type: String } // optional description
// });

// const walletSchema = new mongoose.Schema({
//   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//   balance: { type: Number, default: 0 },
//   transactions: [transactionSchema],
// }, { timestamps: true });

// export default mongoose.model("Wallet", walletSchema);


import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["credit", "debit", "settlement_request"], // includes settlement_request
    default: "credit",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // only used for settlement_request
  },
  split: {
    teacher: { type: Number, default: 100 },
    university: { type: Number, default: 0 },
    platform: { type: Number, default: 0 },
  },
  date: { type: Date, default: Date.now },
  note: { type: String }, // optional description

  // New optional field for referral tracking
  referralPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const walletSchema = new mongoose.Schema(
  {
    // ✅ New fields (generic ownership)
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    ownerType: {
      type: String,
      enum: ["teacher", "university", "referral"],
      required: true,
    },

    // ✅ Old field kept for backward compatibility
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },

    balance: { type: Number, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

// Middleware: auto-sync teacherId for old code
walletSchema.pre("save", function (next) {
  if (this.ownerType === "teacher" && !this.teacherId) {
    this.teacherId = this.ownerId;
  }
  next();
});

export default mongoose.model("Wallet", walletSchema);
