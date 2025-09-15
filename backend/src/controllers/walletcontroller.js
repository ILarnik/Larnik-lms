 import Wallet from "../models/wallet.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// ======================
// Teacher requests settlement
// ======================
export const requestSettlement = async (req, res) => {
  try {
    const { id: teacherId, universityId } = req.user; // assuming user contains universityId if affiliated
    const wallet = await Wallet.findOne({ teacherId });

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance <= 0) return res.status(400).json({ message: "No balance to settle" });

    // Check if teacher is affiliated with university
    if (universityId) {
      wallet.pendingSettlement = wallet.balance; // store pending amount
      wallet.status = "pending_university";
      await wallet.save();
      return res.json({ success: true, message: "Settlement request sent to university", wallet });
    }

    // Freelancer teacher → direct Finance Manager
    wallet.status = "pending_finance";
    await wallet.save();
    res.json({ success: true, message: "Settlement request sent to Finance Manager", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// University approves teacher settlement
// ======================
 

// ======================
// University approves teacher request & creates university wallet transaction for Finance Manager
// ======================
export const universityApproveSettlement = async (req, res) => {
  try {
    const { teacherId, transactionId, teacherShareApproved } = req.body;
    const universityId = req.user.id;

    // 1️⃣ Find teacher wallet
    const teacherWallet = await Wallet.findOne({ teacherId });
    if (!teacherWallet) return res.status(404).json({ message: "Teacher wallet not found" });

    // 2️⃣ Find the teacher settlement request transaction
    const teacherTransaction = teacherWallet.transactions.id(transactionId);
    if (!teacherTransaction || teacherTransaction.status !== "pending_university") {
      return res.status(400).json({ message: "Invalid or already processed transaction" });
    }

    // 3️⃣ Update teacher transaction as approved by university
    teacherTransaction.status = "approved_by_university";
    teacherTransaction.note = `Approved by University (${universityId}), pending Finance Manager`;
    await teacherWallet.save();

    // 4️⃣ Find or create university wallet
    let universityWallet = await Wallet.findOne({ ownerId: universityId, ownerType: "university" });
    if (!universityWallet) {
      universityWallet = new Wallet({
        ownerId: universityId,
        ownerType: "university",
        balance: 0,
        transactions: [],
      });
    }

    // 5️⃣ Create university transaction for Finance Manager approval
    const amountForFinance = teacherShareApproved || teacherTransaction.amount;
    universityWallet.transactions.push({
      type: "settlement_request",
      status: "pending",
      amount: amountForFinance,
      split: {
        teacher: teacherShareApproved || 0, // will be sent to teacher after Finance Manager approval
        university: 0, // university share will be applied dynamically
        platform: 0,
      },
      note: `Settlement request from university for teacher ${teacherId}`,
      teacherId, // track which teacher this is for
      date: new Date(),
      originalTeacherTransactionId: teacherTransaction._id,
    });

    universityWallet.balance += amountForFinance;
    await universityWallet.save();

    res.json({
      success: true,
      message: "University approved teacher request and created settlement for Finance Manager",
      universityWallet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Finance Manager credit
// ======================
export const creditWallet = async (req, res) => {
  try {
    const { ownerId, ownerType = "teacher", studentId, courseId, amount, note } = req.body;
    let wallet;

    if (ownerType === "teacher" || ownerType === "university") {
      wallet = await Wallet.findOne({ teacherId: ownerId });
    } else {
      wallet = await Wallet.findOne({ ownerId, ownerType });
    }

    if (!wallet) wallet = new Wallet({ ownerId, ownerType, balance: 0, transactions: [] });

    wallet.balance += amount;
    wallet.transactions.push({ studentId, courseId, amount, type: "credit", note: note || "Manual credit" });
    await wallet.save();

    res.json({ success: true, message: `₹${amount} credited`, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Finance Manager debit
// ======================
export const debitWallet = async (req, res) => {
  try {
    const { ownerId, ownerType = "teacher", amount, note } = req.body;
    let wallet;

    if (ownerType === "teacher" || ownerType === "university") {
      wallet = await Wallet.findOne({ teacherId: ownerId });
    } else {
      wallet = await Wallet.findOne({ ownerId, ownerType });
    }

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    wallet.transactions.push({ type: "debit", amount, note: note || "Manual debit", date: new Date() });
    await wallet.save();

    res.json({ success: true, message: `₹${amount} debited`, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// Get wallet details
// ======================
 

//  export const getWallet = async (req, res) => {
//   try {
//     const { ownerId } = req.params;
//     const ownerType = req.query.ownerType || "teacher";

//     // Validate ownerId as ObjectId (for all wallet types)
//     if (!mongoose.Types.ObjectId.isValid(ownerId)) {
//       return res.status(400).json({ message: "Invalid owner ID" });
//     }

//     let wallet;

//     if (ownerType === "teacher" || ownerType === "university") {
//       // Look for wallet by ownerId (not teacherId)
//       wallet = await Wallet.findOne({ ownerId })
//         .populate("transactions.studentId", "name email")
//         .populate("transactions.courseId", "title price");
//     } else {
//       wallet = await Wallet.findOne({ ownerId, ownerType })
//         .populate("transactions.studentId", "name email")
//         .populate("transactions.courseId", "title price");
//     }

//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     res.json(wallet);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getWallet = async (req, res) => {
  console.log("getWallet called");
  
  try {
    const { ownerId } = req.params;
    const ownerType = req.query.ownerType || "teacher";
    console.log(ownerId, "ownerId");
    console.log(ownerType, "ownerType");
    

    // ✅ Only validate ObjectId for teacher or university
    if (["teacher", "university"].includes(ownerType) && !mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    let wallet;

    if (["teacher", "university"].includes(ownerType)) {
      wallet = await Wallet.findOne({ ownerId, ownerType })
        .populate("transactions.studentId", "name email")
        .populate("transactions.courseId", "title price");
    } else {
      // Referral or other wallets: no ObjectId validation
      wallet = await Wallet.findOne({ ownerId, ownerType })
        .populate("transactions.studentId", "name email")
        .populate("transactions.courseId", "title price");
    }

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
