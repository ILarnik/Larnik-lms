 // src/controllers/authController.js
 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
// ---------------- SIGNUP ----------------
 

// ---------------- SIGNUP ----------------
// export const signup = async (req, res) => {
//   try {
//     const { name, email, phone, password, roles, universityCode, referralCode } = req.body;

//     if (!name || !email || !phone || !password || !roles) {
//       return res.status(400).json({ message: "Missing required fields or invalid roles" });
//     }

//     // 🔍 Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // 🎯 Default new user object
//     const newUser = new User({
//       name,
//       email,
//       phone,
//       password, // hashed automatically
//       role: roles[0], // primary role
//       universityCode: universityCode || undefined,
//       status: "approved" // or "pending" if you want an approval flow
//     });

//     // 🟢 If referralCode was provided → map referredBy
//     if (referralCode) {
//       const partner = await User.findOne({ referralCode, role: "referral" });
//       if (partner) {
//         newUser.referredBy = partner._id;
//       } else {
//         console.warn(`Invalid referral code provided: ${referralCode}`);
//       }
//     }

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, roles, universityCode, referralCode } = req.body;

    if (!name || !email || !phone || !password || !roles) {
      return res.status(400).json({ message: "Missing required fields or invalid roles" });
    }

    // 🔍 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🎯 Default new user object
    const newUser = new User({
      name,
      email,
      phone,
      password, // hashed automatically
      role: roles[0], // primary role
      status: "approved", // or "pending" if you want approval flow
    });

    // 🟢 If this is a university signup → universityCode will auto-generate in pre-save hook
    if (roles[0] === "university") {
      // nothing to set manually; code generated automatically
    }

 // 🟢 If this is a teacher signup with universityCode → link teacher to university
if (roles[0] === "teacher" && universityCode) {
  const university = await User.findOne({ universityCode, role: "university" });
  if (!university) {
    return res.status(400).json({ message: "Invalid university code" });
  }
  newUser.affiliatedUniversity = university._id; // ✅ consistent field
}


    // 🟢 If referralCode provided → map referredBy
    if (referralCode) {
      const partner = await User.findOne({ referralCode, role: "referral" });
      if (partner) {
        newUser.referredBy = partner._id;
      } else {
        console.warn(`Invalid referral code provided: ${referralCode}`);
      }
    }

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
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
