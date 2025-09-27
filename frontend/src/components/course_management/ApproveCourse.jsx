// src/components/ApproveCourse.jsx
import React, { useState, useEffect } from "react";
import { getCourses, approveCourses } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import CustomButton from "../ui/CustomButton";

export default function ApproveCourse() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApprove = async (id, action) => {
    await approveCourses(id, action);
    fetchCourses();
  };

return (
  <ElevatedCard
    title="Approve Courses"
    subtitle="Review pending courses and approve or reject"
  >
    {courses.length === 0 && (
      <p className="text-gray-500 text-sm text-center py-4">
        No courses pending approval.
      </p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {courses.map((c) => (
        <div
          key={c._id}
          className="border rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white break-words">
            {c.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
            {c.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <CustomButton
              onClick={() => handleApprove(c._id, "approved")}
              label={"Approve"}
              className={"bg-emerald-600 hover:bg-emerald-700 text-white"}
            />
            <CustomButton
              onClick={() => handleApprove(c._id, "rejected")}
              label={"Reject"}
              className={"bg-red-600 hover:bg-red-700 text-white"}
            />
          </div>
        </div>
      ))}
    </div>
  </ElevatedCard>
);

}
