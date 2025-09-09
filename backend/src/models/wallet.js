// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   amount: { type: Number, required: true },
//   type: { type: String, enum: ["credit", "debit"], default: "credit" }, // credit = earnings, debit = withdrawal
//   date: { type: Date, default: Date.now },
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
    enum: ["credit", "debit", "settlement_request"], // add settlement_request
    default: "credit" 
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" // only used for settlement_request
  },
  split: { // dynamic split percentages
    teacher: { type: Number, default: 100 },
    university: { type: Number, default: 0 },
    platform: { type: Number, default: 0 }
  },
  date: { type: Date, default: Date.now },
  note: { type: String } // optional description
});

const walletSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
}, { timestamps: true });

export default mongoose.model("Wallet", walletSchema);
