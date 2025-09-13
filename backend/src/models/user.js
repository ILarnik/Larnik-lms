 // src/models/user.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailOtpSchema = new mongoose.Schema({
  code: { type: String },
  expiresAt: { type: Date },
  attempts: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    role: {
      type: String,
      enum: ["student", "teacher", "university", "referral", "superadmin", "sub-admin"],
      default: "student",
    },

    // Fixed sub-admin role (only for sub-admins)
    subAdminRole: {
      type: String,
      enum: ["blog_manager", "finance_manager", "governance", "role_manager", "career_cell"],
      default: null,
    },

    referralCode: { type: String, unique: true, sparse: true }, // auto-generated for referral partners
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // who referred this user

    // Dynamic sub-role (only for sub-admins)
    dynamicSubRole: {
      type: String,
      enum: ["writer", "reviewer"],
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    emailOtp: emailOtpSchema,
    walletBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// =======================
// Pre-validate hook for sub-admin rules
// =======================
userSchema.pre("validate", function (next) {
  if (this.subAdminRole && this.role !== "sub-admin") {
    this.subAdminRole = null;
  }

  if (this.dynamicSubRole && this.role !== "sub-admin") {
    this.dynamicSubRole = null;
  }

  next();
});

// =======================
// Pre-save hook for password hashing
// =======================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// =======================
// Compare password method
// =======================
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// =======================
// Generate unique referral code for referral partners
// =======================
 userSchema.pre("save", async function (next) {
  try {
    if (this.role === "referral" && !this.referralCode) {
      let unique = false;

      while (!unique) {
        // ✅ use substring instead of deprecated substr
        const code = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const existingUser = await mongoose.models.User.findOne({ referralCode: code });

        if (!existingUser) {
          this.referralCode = code;
          unique = true;
        }
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

// =======================
// Indexes for faster queries
// =======================
userSchema.index({ role: 1, subAdminRole: 1, dynamicSubRole: 1 });
userSchema.index({ status: 1 });

export default mongoose.model("User", userSchema);
