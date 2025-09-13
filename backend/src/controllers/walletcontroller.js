 import Wallet from "../models/wallet.js";
import Course from "../models/course.js";
import mongoose from "mongoose";
import User from "../models/user.js"; 

// ======================
// Teacher requests settlement
// ======================
 export const requestSettlement = async (req, res) => {
  try {
    // ✅ Use logged-in teacher ID
    const teacherId = req.user.id;

    // 1️⃣ Find teacher wallet
    const wallet = await Wallet.findOne({ teacherId: new mongoose.Types.ObjectId(teacherId) });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.balance <= 0) {
      return res.status(400).json({ message: "No balance available for settlement" });
    }

    // 2️⃣ Check if teacher is affiliated to a university
    const courses = await Course.find({ createdBy: teacherId }).populate("university");
    let affiliatedUniversityId = null;

    if (courses.length > 0 && courses[0].university) {
      affiliatedUniversityId = courses[0].university._id;
    }

    // 3️⃣ Determine transaction status
    let status = "pending"; // default for freelancers
    let note = "Teacher requested payout";

    // Default split placeholders; actual split will be determined later
    let split = { teacher: 0, university: 0, platform: 0 };

    if (affiliatedUniversityId) {
      status = "pending_university"; // awaiting university approval
      note = "Teacher requested payout (awaiting university approval)";
      split.university = 0; // university will assign the teacher share later
      split.teacher = 0; // teacher share not yet defined
    }

    // 4️⃣ Add settlement_request transaction
    wallet.transactions.push({
      type: "settlement_request",
      status,
      amount: wallet.balance,
      split,
      date: new Date(),
      note,
      universityId: affiliatedUniversityId || null
    });

    await wallet.save();

    res.json({
      success: true,
      message: "Settlement requested successfully. Split will be determined by university/finance manager.",
      wallet
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// University approves teacher request & creates university wallet transaction
// ======================
export const universityApproveSettlement = async (req, res) => {
  try {
    const { teacherId, transactionId, teacherShare } = req.body; // teacherShare = amount university approves for teacher

    // 1️⃣ Find teacher wallet
    const wallet = await Wallet.findOne({ teacherId });
    if (!wallet) return res.status(404).json({ message: "Teacher wallet not found" });

    // 2️⃣ Find teacher transaction
    const transaction = wallet.transactions.id(transactionId);
    if (!transaction || transaction.status !== "pending_university") {
      return res.status(400).json({ message: "Invalid or already processed transaction" });
    }

    // 3️⃣ Update teacher transaction
    transaction.status = "approved_by_university";
    transaction.note = "Approved by University, pending Finance Manager";
    await wallet.save();

    // 4️⃣ Find or create university wallet
    const universityId = transaction.universityId;
    if (!universityId) return res.status(400).json({ message: "No affiliated university found" });

    let uniWallet = await Wallet.findOne({ teacherId: universityId });
    if (!uniWallet) {
      uniWallet = new Wallet({ teacherId: universityId, balance: 0, transactions: [] });
    }

    // 5️⃣ Create university settlement request transaction
    uniWallet.transactions.push({
      type: "settlement_request",
      status: "pending", // pending finance manager approval
      amount: teacherShare, // amount approved for teacher by university
      split: {
        teacher: 100, // university decides teacher's share
        university: 0, // university keeps the rest after platform cut by finance
        platform: 0
      },
      note: `Settlement request from university for teacher ${teacherId}`,
      date: new Date(),
      originalTeacherTransactionId: transaction._id
    });

    await uniWallet.save();

    res.json({ success: true, message: "University approved teacher request and created settlement", uniWallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Credit teacher (manual/admin action)
// ======================
export const creditWallet = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = await Course.findById(courseId).populate("createdBy");
    if (!course) return res.status(404).json({ message: "Course not found" });

    const amount = course.price;
    const teacherId = course.createdBy._id;

    let wallet = await Wallet.findOne({ teacherId });
    if (!wallet) {
      wallet = new Wallet({ teacherId, balance: 0, transactions: [] });
    }

    wallet.balance += amount;
    wallet.transactions.push({
      studentId,
      courseId,
      amount,
      type: "credit",
      note: "Manual credit"
    });

    await wallet.save();

    res.json({ success: true, message: `₹${amount} credited`, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Get teacher or university wallet
// ======================
export const getWallet = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const wallet = await Wallet.findOne({ teacherId })
      .populate("transactions.studentId", "name email")
      .populate("transactions.courseId", "title price");

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Debit wallet (manual/admin action)
// ======================
export const debitWallet = async (req, res) => {
  try {
    const { teacherId, amount } = req.body;

    let wallet = await Wallet.findOne({ teacherId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    wallet.transactions.push({
      type: "debit",
      amount,
      note: "Manual debit",
      date: new Date()
    });

    await wallet.save();

    res.json({ success: true, message: `₹${amount} debited`, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};









// referral partner 
 
// ======================
export const creditReferralWallet = async (studentId, courseId, amount) => {
  try {
    // 🔍 Find student
    const student = await User.findById(studentId);
    if (!student || !student.referredBy) {
      return null; // no referral applied
    }

    const partnerId = student.referredBy;

    // 🔍 Find or create referral partner wallet
    let wallet = await Wallet.findOne({ ownerId: partnerId, ownerType: "referral" });
    if (!wallet) {
      wallet = new Wallet({
        ownerId: partnerId,
        ownerType: "referral",
        balance: 0,
        transactions: [],
      });
    }

    // 🔍 Count referrals to decide commission %
    const referredCount = await User.countDocuments({ role: "student", referredBy: partnerId });
    let rate = 0.01;
    if (referredCount >= 11 && referredCount <= 20) rate = 0.025;
    else if (referredCount >= 21 && referredCount <= 40) rate = 0.05;
    else if (referredCount > 40) rate = 0.1;

    const commission = amount * rate;

    // 🔍 Credit wallet
    wallet.balance += commission;
    wallet.transactions.push({
      studentId,
      courseId,
      amount: commission,
      type: "credit",
      note: `Referral commission credited (rate: ${rate * 100}%)`,
      date: new Date(),
    });

    await wallet.save();

    return wallet;
  } catch (err) {
    console.error("Error crediting referral wallet:", err.message);
    return null;
  }
};

// ======================
// Request settlement (for referral partners only)
// ======================
export const referralRequestSettlement = async (req, res) => {
  try {
    const partnerId = req.user.id;

    // 1️⃣ Find referral partner wallet
    const wallet = await Wallet.findOne({ ownerId: partnerId, ownerType: "referral" });
    if (!wallet) return res.status(404).json({ message: "Referral wallet not found" });

    if (wallet.balance <= 0) {
      return res.status(400).json({ message: "No balance available for settlement" });
    }

    // 2️⃣ Create settlement request
    wallet.transactions.push({
      type: "settlement_request",
      status: "pending",
      amount: wallet.balance,
      note: "Referral partner requested payout",
      date: new Date(),
    });

    await wallet.save();

    res.json({
      success: true,
      message: "Referral settlement requested successfully (pending Finance Manager approval).",
      wallet,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

