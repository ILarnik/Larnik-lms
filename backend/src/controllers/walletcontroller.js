 import Wallet from "../models/wallet.js";
import Course from "../models/course.js";

// ✅ Credit teacher when student enrolls (or admin wants to simulate credit)
export const creditWallet = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // 1. Find course and teacher
    const course = await Course.findById(courseId).populate("createdBy");
    if (!course) return res.status(404).json({ message: "Course not found" });

    const amount = course.price;
    const teacherId = course.createdBy._id;

    // 2. Check if wallet exists, else create
    let wallet = await Wallet.findOne({ teacherId });
    if (!wallet) {
      wallet = new Wallet({ teacherId, balance: 0, transactions: [] });
    }

    // 3. Credit balance and add transaction
    wallet.balance += amount; // 💡 commission logic here
    wallet.transactions.push({
      studentId,
      courseId,
      amount,
      type: "credit",
    });

    await wallet.save();

    res.json({
      success: true,
      message: `₹${amount} credited to teacher wallet`,
      wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get teacher wallet details
 export const getWallet = async (req, res) => {
  try {
    const { teacherId } = req.params;  // expect teacherId from route

    const wallet = await Wallet.findOne({ teacherId })
      .populate("transactions.studentId", "name email")
      .populate("transactions.courseId", "title price");

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Debit teacher wallet (admin settles)
export const debitWallet = async (req, res) => {
  try {
    const { teacherId, amount } = req.body;

    let wallet = await Wallet.findOne({ teacherId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance
    wallet.balance -= amount;
    wallet.transactions.push({
      studentId: null,
      courseId: null,
      amount,
      type: "debit",
    });

    await wallet.save();

    res.json({
      success: true,
      message: `₹${amount} debited from teacher wallet`,
      wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 
// ✅ Teacher requests a settlement
export const requestSettlement = async (req, res) => {
  try {
    const { teacherId, split } = req.body; // split: { teacher: %, university: %, platform: % }

    // 1️⃣ Find teacher wallet
    const wallet = await Wallet.findOne({ teacherId });
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

    // 3️⃣ Determine initial transaction status
    let status = "pending"; // default for freelancers
    let note = "Teacher requested payout";

    if (affiliatedUniversityId) {
      status = "pending_university"; // waiting for university approval
      note = "Teacher requested payout (awaiting university approval)";
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

    res.json({ success: true, message: "Settlement requested successfully", wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ University approves settlement request
export const universityApproveSettlement = async (req, res) => {
  try {
    const { teacherId, transactionId, split } = req.body;
    // split: optional adjustments for teacher/university/platform

    // 1️⃣ Find teacher wallet
    const wallet = await Wallet.findOne({ teacherId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    // 2️⃣ Find the pending settlement request
    const transaction = wallet.transactions.id(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status !== "pending_university") {
      return res.status(400).json({ message: "Transaction not pending university approval" });
    }

    // 3️⃣ Update status and optionally update split percentages
    transaction.status = "approved_by_university";
    if (split) {
      transaction.split = split;
    }
    transaction.note = "Approved by university";

    await wallet.save();

    res.json({
      success: true,
      message: "Settlement approved by university",
      wallet,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
