import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  tempUserData: { type: Object, required: true }, // name, phone, password, roles, universityCode, referralCode
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);
