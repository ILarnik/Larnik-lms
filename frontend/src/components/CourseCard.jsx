import React from "react";
import CardDesign from "./CradDesign";
import { enrollInCourse } from "../api/api";

export default function CourseCard({ course, userId }) {
  const handleEnroll = async () => {
    console.log("Course ID being sent:", course._id || course.id);

    try {
      await enrollInCourse(course._id);
      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Try again.");
    }
  };

return (
  <div className="w-64 sm:w-72 md:w-80 lg:w-96 mx-auto my-6 sm:my-10 bg-green-300 rounded-2xl shadow-xl sm:shadow-2xl shadow-green-500/70 sm:shadow-green-500/90 hover:scale-[1.02] hover:shadow-green-600/80 sm:hover:shadow-green-600/90 transition-transform duration-300">
    <CardDesign
      course={course}
      userId={userId}
      height="h-[380px] sm:h-[420px]"
      img="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
      variant="course"
      title={course.title}
      description={`by ${course.createdBy?.name || "Unknown"}`}
      btnName="Enroll"
      price={course.price === 0 ? "Free" : `₹${course.price}`}
      onClick={handleEnroll}
    />
  </div>
);


}
