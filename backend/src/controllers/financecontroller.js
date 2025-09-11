 import Wallet from "../models/wallet.js";
import mongoose from "mongoose";

// ======================
// Finance Manager approves payout
// ======================
// export const approveSettlement = async (req, res) => {
//   try {
//     const { walletOwnerId, transactionId, platformShare } = req.body;
//     // walletOwnerId = either teacher (freelancer) or university (for affiliated teacher)

//     // 1️⃣ Find wallet
//     const wallet = await Wallet.findOne({ teacherId: walletOwnerId });
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     // 2️⃣ Find settlement transaction
//     const transaction = wallet.transactions.id(transactionId);
//     if (!transaction || transaction.status !== "pending") {
//       return res.status(400).json({ message: "Invalid or already processed transaction" });
//     }

//     const totalAmount = transaction.amount;

//     // 3️⃣ Calculate shares
//     let teacherShare = 0;
//     let universityShare = 0;

//     if (transaction.type !== "settlement_request") {
//       return res.status(400).json({ message: "Transaction is not a settlement request" });
//     }

//     if (transaction.split.university && transaction.universityId) {
//       // Case: affiliated teacher -> transaction came from university wallet
//       universityShare = totalAmount - (platformShare || 0) - (transaction.split.teacher * totalAmount) / 100;
//       teacherShare = totalAmount - universityShare - (platformShare || 0);
//     } else {
//       // Case: freelancer teacher -> direct split
//       teacherShare = totalAmount - (platformShare || 0);
//       universityShare = 0;
//     }

//     // 4️⃣ Update wallet
//     wallet.balance -= totalAmount;
//     transaction.status = "approved";
//     transaction.note = `Settlement approved by Finance Manager (platformShare: ₹${platformShare || 0})`;
//     await wallet.save();

//     // 5️⃣ Credit teacher wallet if payout from university
//     if (transaction.split.university && transaction.universityId) {
//       const teacherId = transaction.split.teacherId; // teacher who belongs to university
//       if (teacherId) {
//         let teacherWallet = await Wallet.findOne({ teacherId });
//         if (!teacherWallet) {
//           teacherWallet = new Wallet({ teacherId, balance: 0, transactions: [] });
//         }
//         teacherWallet.balance += teacherShare;
//         teacherWallet.transactions.push({
//           type: "credit",
//           amount: teacherShare,
//           note: `Teacher share from university settlement`,
//           date: new Date(),
//         });
//         await teacherWallet.save();
//       }
//     }

//     // 6️⃣ Platform share: can be recorded/logged separately
//     // e.g., update a platform wallet or just store in transaction.note

//     res.json({
//       success: true,
//       message: "Settlement approved successfully",
//       totalAmount,
//       teacherShare,
//       universityShare,
//       platformShare: platformShare || 0,
//       wallet
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



export const approveSettlement = async (req, res) => {
  try {
    const { walletOwnerId, transactionId, platformShare = 0 } = req.body;
    // walletOwnerId: teacher (freelancer) or university (for affiliated teacher)

    // 1️⃣ Find the wallet
    const wallet = await Wallet.findOne({ teacherId: walletOwnerId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    // 2️⃣ Find the settlement transaction
    const transaction = wallet.transactions.id(transactionId);
    if (!transaction || transaction.status !== "pending") {
      return res.status(400).json({ message: "Invalid or already processed transaction" });
    }

    if (transaction.type !== "settlement_request") {
      return res.status(400).json({ message: "Transaction is not a settlement request" });
    }

    const totalAmount = transaction.amount;
    let teacherShare = 0;
    let universityShare = 0;

    // 3️⃣ Determine shares
    if (transaction.split.university && transaction.universityId) {
      // Affiliated teacher: university decides teacher portion
      universityShare = totalAmount - (platformShare || 0) - (transaction.split.teacher * totalAmount) / 100;
      teacherShare = totalAmount - universityShare - (platformShare || 0);
    } else {
      // Freelancer teacher: direct split with platform
      teacherShare = totalAmount - (platformShare || 0);
    }

    // 4️⃣ Debit wallet (teacher or university)
    wallet.balance -= totalAmount;
    transaction.status = "approved";
    transaction.note = `Settlement approved by Finance Manager (platformShare: ₹${platformShare})`;
    await wallet.save();

    // 5️⃣ Credit teacher wallet if payout from university
    if (transaction.split.university && transaction.universityId) {
      const teacherId = transaction.split.teacherId;
      if (teacherId) {
        let teacherWallet = await Wallet.findOne({ teacherId: new mongoose.Types.ObjectId(teacherId) });
        if (!teacherWallet) {
          teacherWallet = new Wallet({ teacherId, balance: 0, transactions: [] });
        }
        teacherWallet.balance += teacherShare;
        teacherWallet.transactions.push({
          type: "credit",
          amount: teacherShare,
          note: `Teacher share from university settlement`,
          date: new Date(),
        });
        await teacherWallet.save();
      }
    }

    // 6️⃣ Platform share: log or handle separately if needed

    res.json({
      success: true,
      message: "Settlement approved successfully",
      totalAmount,
      teacherShare,
      universityShare,
      platformShare,
      wallet
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
