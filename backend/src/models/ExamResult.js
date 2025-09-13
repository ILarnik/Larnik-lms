import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module", // optional, for module-wise exams
    },

    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },
    percentage: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Passed", "Failed"],
    },

    // Optional: certificate if passed
    certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
    },

    takenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-calculate percentage + pass/fail before save
examResultSchema.pre("save", async function (next) {
  if (this.totalMarks > 0) {
    this.percentage = ((this.score / this.totalMarks) * 100).toFixed(2);
  }

  // 🔹 Default passingScore is 33 unless overridden in course
  let passingScore = 33;
  if (this.course) {
    const Course = mongoose.model("Course");
    const course = await Course.findById(this.course).select("passingScore");
    if (course && course.passingScore) {
      passingScore = course.passingScore;
    }
  }

  this.status = this.percentage >= passingScore ? "Passed" : "Failed";
  next();
});

const ExamResult = mongoose.model("ExamResult", examResultSchema);
export default ExamResult;
