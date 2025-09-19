// import React, { useState } from "react";
// import CardDesign from "./CradDesign";

// export default function CourseCard({ course }) {
//   // States
//   const [courseName, setCourseName] = useState(
//     "Complete javascript course for beginners"
//   );
//   const [author, setAuthor] = useState("by ashok kumar saini");
//   const [price, setPrice] = useState(456);
//   const [img, setImg] = useState(
//     "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
//   );

//   return (
//     <div className="w-80 h-auto mx-auto m-10 bg-white rounded-2xl shadow-2xl">
//      <CardDesign height="h-[420px]" width="" img={img} variant="course" title={courseName} description={author} btnName="Enroll" price={price} />
//     </div>
  
    
//   );
// }


 import React from "react";
import CardDesign from "./CradDesign";
import { enrollInCourse } from "../api/api";

export default function CourseCard({ course }) {
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
    <div className="w-72 h-auto mx-auto m-10 bg-green-300 shadow-green-500/90 rounded-2xl shadow-2xl">
      <CardDesign
        height="h-[420px]"
        img={
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
        }
        variant="course"
        title={course.title}
        description={`by ${course.createdBy?.name || "Unknown"}`}
        btnName="Enroll"               // ✅ just passed as prop
        price={course.price === 0 ? "Free" : `₹${course.price}`}
        onClick={handleEnroll}         // ✅ passed as prop
      />
    </div>
  );
}
