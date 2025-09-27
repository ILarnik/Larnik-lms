import React, { useState ,useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const EnrollButton = ({ course, userId }) => {

const [token, setToken] =useState("");

// console.log("EnrollButton props:", { course, userId });


useEffect(() => {
    const fetchUser = async () => {
      try {
        const token1 = localStorage.getItem("token");
        if (!token1) throw new Error("User not logged in");

        const decoded = jwtDecode(token1); // ✅ decode JWT
        // console.log("User ID from EnrollButton:", token1);
        setToken(token1);
      // console.log("Decoded JWT:", decoded.id);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "Failed to fetch.");
      }
    };
    fetchUser();
  }, []);

  const handleEnroll = async () => {
    try {
      // 1️⃣ Create order on backend
      const orderRes = await axios.post(
        "http://localhost:5000/api/payments/order",
        { amount: course.price }, // replace with your course price dynamically
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // replace with actual token
          },
        }
      );

      const { id: order_id, amount, currency } = orderRes.data;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_RJJqnxJSiDUGxA", // from .env (frontend cannot access secret)
        amount,
        currency,
        name: "Your LMS",
        description: "Course Purchase",
        order_id,
        handler: async function (response) {
          // 3️⃣ Send payment details to backend for verification
          const verifyRes = await axios.post(
            "http://localhost:5000/api/payments/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
              userId,
              amount: course.price,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyRes.data.success) {
            alert("Payment successful and student enrolled!");
          } else {
            alert("Payment verification failed!");
          }
        },
        // prefill: {
        //   email: "student@example.com",
        //   contact: "9999999999",
        // },
        theme: {
          color: "#4caf50",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Enroll error:", err);
      alert("Failed to initiate payment");
    }
  };

  return (
  <button
    onClick={handleEnroll}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
  >
    Enroll
  </button>
);

};

export default EnrollButton;
