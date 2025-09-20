 import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["SUCCESS", "FAILED"], default: "SUCCESS" },
    purchasedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);


