 import mongoose from "mongoose";

const settlementRequestSchema = new mongoose.Schema({
  sourceWalletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  sourceOwnerType: String,
  sourceOwnerId: mongoose.Schema.Types.ObjectId,
  targetType: String, // university | finance
  targetId: mongoose.Schema.Types.ObjectId,
  amount: Number,
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
  createdBy: mongoose.Schema.Types.ObjectId,
  approvedBy: mongoose.Schema.Types.ObjectId,
  approvedAt: Date,
  metadata: {}, // split info saved here
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SettlementRequest", settlementRequestSchema);
