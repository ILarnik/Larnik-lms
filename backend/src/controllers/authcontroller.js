 import User from "../models/user.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/email.js";
import crypto from "crypto";

// ---------------- SIGNUP ----------------
  

 

 
 

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, roles, universityCode, referralCode, otp } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ========================
    // Step 1: OTP verification
    // ========================
    if (otp) {
      const record = await Otp.findOne({ email, otp });
      if (!record) return res.status(400).json({ message: "Invalid OTP" });
      if (record.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

      const { tempUserData } = record;

      // Delete OTP after verification
      await Otp.deleteOne({ _id: record._id });

      const newUser = new User({
        name: tempUserData.name,
        email: record.email,
        phone: tempUserData.phone,
        password: tempUserData.password,
        role: tempUserData.roles[0],
        status: "approved",
      });

      // Teacher affiliation
      if (tempUserData.roles[0] === "teacher" && tempUserData.universityCode) {
        const university = await User.findOne({ universityCode: tempUserData.universityCode, role: "university" });
        if (!university) return res.status(400).json({ message: "Invalid university code" });
        newUser.affiliatedUniversity = university._id;
      }

      // Referral mapping
      if (tempUserData.referralCode) {
        const partner = await User.findOne({ referralCode: tempUserData.referralCode, role: "referral" });
        if (partner) newUser.referredBy = partner._id;
      }

      await newUser.save();
      return res.status(201).json({ message: "User registered successfully", user: newUser });
    }

    // ========================
    // Step 2: Generate & send OTP
    // ========================
    if (!name || !phone || !password || !roles) {
      return res.status(400).json({ message: "Missing required fields or invalid roles" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await Otp.create({
      email,
      otp: generatedOtp,
      expiresAt,
      tempUserData: { name, phone, password, roles, universityCode, referralCode }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your Signup OTP",
      html: `<p>Your OTP for signup is <b>${generatedOtp}</b>. It expires in 10 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// ---------------- LOGIN WITH PASSWORD ----------------
export const loginWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Optional: skip approval for testing
    // if (user.status !== "approved") {
    //   return res.status(403).json({ message: `Account status is "${user.status}". Access denied.` });
    // }

    const token = jwt.sign(
      { id: user._id, role: user.role, subAdminRole: user.subAdminRole, dynamicSubRole: user.dynamicSubRole },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- REQUEST OTP ----------------
export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailOtp = {
      code: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0
    };

    await user.save();

    // TODO: send OTP via email or SMS
   // await(email, otpCode);
    console.log(`OTP for ${email}: ${otpCode}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- LOGIN WITH OTP ----------------
export const loginWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.emailOtp || user.emailOtp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.emailOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Clear OTP after successful login
    user.emailOtp = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role, subAdminRole: user.subAdminRole, dynamicSubRole: user.dynamicSubRole },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
