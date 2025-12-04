 import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["student", "teacher", "university", "referral", "superadmin", "sub-admin"], default: "student" },
  subAdminRole: { type: String, enum: ["blog_manager","finance_manager","governance","role_manager","career_cell"], default: null },
  referralCode: { type: String, unique: true, sparse: true },
  universityCode: { type: String, unique: true, sparse: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  affiliatedUniversity: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  dynamicSubRole: { type: String, enum: ["writer","reviewer"], default: null },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  walletBalance: { type: Number, default: 0 },
  passwordResetToken: { type: String },
  passwordResetOtp: { type: String },
  passwordResetExpires: { type: Date },
}, { timestamps: true });

// pre-save hooks, password hashing, referral/university code generation, etc. (same as before)

 

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
    // ✅ Referral partner code
    if (this.role === "referral" && !this.referralCode) {
      let unique = false;
      while (!unique) {
        const code = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const existingUser = await mongoose.models.User.findOne({ referralCode: code });
        if (!existingUser) {
          this.referralCode = code;
          unique = true;
        }
      }
    }

    // ✅ University code
    // if (this.role === "university" && !this.universityCode) {
    //   let unique = false;
    //   while (!unique) {
    //     const code = `UNI${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    //     const existingUser = await mongoose.models.User.findOne({ universityCode: code });
    //     if (!existingUser) {
    //       this.universityCode = code;
    //       unique = true;
    //     }
    //   }
    // }
if (this.role === "university" && !this.universityCode) {
      this.universityCode = `UNI${Date.now().toString(36).toUpperCase()}${Math.random()
        .toString(36)
        .substring(2, 4)
        .toUpperCase()}`;
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


 


export default mongoose.model("User" ,userSchema);
 
