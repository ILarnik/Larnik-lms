import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js ";

const router = express.Router();

// Create a new Razorpay order
router.post("/order", createOrder);

// Verify payment + save purchase
router.post("/verify", verifyPayment);

export default router;
