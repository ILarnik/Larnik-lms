import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/Purchase.js";
import User from "../models/user.js";
import Course from "../models/course.js";

/**
 * ==========================
 * CREATE ORDER
 * ==========================
 */
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // convert INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({ message: "Unable to create order" });
  }
};
 
 export const verifyPayment = async (req, res) => {
  console.log("ok till now");
  
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      studentId,
      amount,
    } = req.body;

    // 🔐 Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Find student
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // ✅ Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 🚨 Prevent duplicate enrollment
    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" });
    }

    // ✅ Save purchase in DB
    const purchase = await Purchase.create({
      course: courseId,
      student: studentId,
      studentName: student.name,
      studentEmail: student.email,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      amount,
      status: "SUCCESS",
    });

    // ✅ Enroll student into course
    course.enrolledStudents.push(studentId);
    await course.save();

    // ✅ Credit Finance Manager Wallet
    let financeWallet = await Wallet.findOne({ ownerType: "platform" });
    if (!financeWallet) {
      financeWallet = new Wallet({
        ownerType: "platform",
        ownerId: new mongoose.Types.ObjectId(), // Or a fixed Admin ID
        balance: 0,
        transactions: [],
      });
    }

    financeWallet.balance += amount;
    financeWallet.transactions.push({
      studentId,
      courseId,
      amount,
      type: "credit",
      note: "Course purchase",
      date: new Date(),
    });

    await financeWallet.save();

    res.json({
      success: true,
      message: "Payment verified, student enrolled, finance wallet credited!",
      purchase,
    });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
