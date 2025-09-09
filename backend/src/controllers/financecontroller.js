 import Wallet from "../models/wallet.js";
import mongoose from "mongoose";

// Finance manager approves settlement
export const approveSettlement = async (req, res) => {
  try {
    const { teacherId, transactionId } = req.body;

    const wallet = await Wallet.findOne({ teacherId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transaction = wallet.transactions.id(transactionId);
    if (!transaction || transaction.status !== "pending") {
      return res.status(400).json({ message: "Invalid or already processed transaction" });
    }

    // Calculate splits
    const totalAmount = transaction.amount;
    const teacherShare = (totalAmount * transaction.split.teacher) / 100;
    const universityShare = transaction.split.university ? (totalAmount * transaction.split.university) / 100 : 0;
    const platformShare = (totalAmount * transaction.split.platform) / 100;

    // Debit teacher wallet
    wallet.balance -= totalAmount;
    transaction.status = "approved";
    transaction.note = "Settlement approved by Finance Manager";
    await wallet.save();

    // Credit university wallet if applicable
    if (universityShare && transaction.split.universityId) {
      const uniWallet = await Wallet.findOne({ teacherId: transaction.split.universityId });
      if (uniWallet) {
        uniWallet.balance += universityShare;
        uniWallet.transactions.push({
          type: "credit",
          amount: universityShare,
          note: `University share from teacher ${teacherId} settlement`,
          date: new Date(),
        });
        await uniWallet.save();
      }
    }

    // Platform share can be logged in a separate account/wallet or just recorded in transaction history

    res.json({
      success: true,
      message: "Settlement approved successfully",
      teacherWallet: wallet,
      teacherShare,
      universityShare,
      platformShare
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
