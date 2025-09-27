// src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import { getApproveCourses, deleteCourse } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import CustomButton from "../ui/CustomButton";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await getApproveCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await deleteCourse(id);
    fetchCourses();
  };

return (
  <ElevatedCard
    title="Approved Courses"
    subtitle="List of courses approved & live on the platform"
  >
    {courses.length === 0 && (
      <p className="text-gray-500 text-sm text-center py-4">
        No approved courses yet.
      </p>
    )}

    <div className="space-y-4">
      {courses.map((c) => (
        <div
          key={c._id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 shadow-sm hover:shadow-md transition"
        >
          <div className="flex-1">
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl uppercase text-gray-900 dark:text-white break-words">
              {c.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-2xl capitalize mt-1 line-clamp-3 break-words">
              {c.description}
            </p>
            <span className="text-gray-500 block text-sm sm:text-base md:text-xl capitalize mt-2">
              By: {c.createdBy?.name || "Unknown"}
            </span>
            <span className="text-xs text-gray-500">
              Course ID: {c.courseuniqueId}
            </span>
          </div>

          <div className="w-full sm:w-auto">
            <CustomButton
              label={"Delete"}
              onClick={() => handleDelete(c._id)}
              className={"w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"}
            />
          </div>
        </div>
      ))}
    </div>
  </ElevatedCard>
);

}
