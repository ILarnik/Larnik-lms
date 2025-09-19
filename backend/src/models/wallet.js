 import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true }, // only credit/debit for balance operations
  status: {
    type: String,
    enum: [
      "pending_university",
      "approved_by_university",
      "pending_finance",
      "approved",
      "rejected",
    ],
    default: "pending_finance",
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
  metadata: {}, // extra info: courseId, targetUniversityId, etc.
});

const walletSchema = new mongoose.Schema({
  ownerType: {
    type: String,
    enum: ["teacher", "university", "referral", "platform"],
    required: true,
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  balance: { type: Number, default: 0 },
  onHold: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

walletSchema.index({ ownerType: 1, ownerId: 1 }, { unique: true });

export default mongoose.model("Wallet", walletSchema);
