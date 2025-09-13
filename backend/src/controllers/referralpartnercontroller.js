 // controllers/referralPartnerController.js
import User from "../models/user.js";
import Wallet from "../models/wallet.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ✅ Get my profile
export const getProfile = async (req, res) => {
  try {
    const partner = await User.findById(req.user.id).select("-password");
    if (!partner || partner.role !== "referral") {
      return res.status(403).json({ message: "Not a referral partner" });
    }
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all students referred by me
export const myReferrals = async (req, res) => {
  try {
    const partner = await User.findById(req.user.id);
    if (!partner || partner.role !== "referral") {
      return res.status(403).json({ message: "Not a referral partner" });
    }

    // 🔍 Fetch students linked via referredBy
    const students = await User.find({ role: "student", referredBy: partner._id })
      .select("name email createdAt");

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get my earnings from wallet (instead of raw payments)
export const myEarnings = async (req, res) => {
  try {
    const partner = await User.findById(req.user.id);
    if (!partner || partner.role !== "referral") {
      return res.status(403).json({ message: "Not a referral partner" });
    }

    // 🔍 Find partner wallet
    const wallet = await Wallet.findOne({ ownerId: partner._id, ownerType: "referral" });
    if (!wallet) {
      return res.json({ referredCount: 0, totalRevenue: 0, commission: 0, balance: 0, transactions: [] });
    }

    // 🔍 Count referred students
    const referredCount = await User.countDocuments({ role: "student", referredBy: partner._id });

    // 🔍 Commission tier based on student count
    let rate = 0.01;
    if (referredCount >= 11 && referredCount <= 20) rate = 0.025;
    else if (referredCount >= 21 && referredCount <= 40) rate = 0.05;
    else if (referredCount > 40) rate = 0.1;

    // 🔍 Total revenue credited
    const totalRevenue = wallet.transactions
      .filter(tx => tx.type === "credit")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const commission = totalRevenue; // already credited into wallet

    res.json({
      referredCount,
      rate,
      totalRevenue,
      commission,
      balance: wallet.balance,
      transactions: wallet.transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 

export const updateReferralProfile = async (req, res) => {
  try {
    const userId = req.user.id; // logged-in referral partner
    const { name, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update name if provided
    if (name) user.name = name;

    // Update password if provided
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        walletBalance: user.walletBalance,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
