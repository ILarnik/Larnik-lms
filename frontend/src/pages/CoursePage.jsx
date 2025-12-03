import React, { useEffect, useState } from "react";
import { getApproveCourses, getCoupons } from "../api/api";
import CourseCard from "../components/CourseCard";
import DiscountBar from "../components/DiscountBar";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userId, setUserId] = useState([]);
  const location = useLocation();

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const decoded = jwtDecode(token); // ✅ decode JWT
        // console.log(decoded,"my");
        
        setUserId(decoded.id);
      // console.log("Decoded JWT:", decoded.id);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "Failed to fetch.");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch approved courses
        const coursesRes = await getApproveCourses();
        let allCourses = coursesRes.data;

        // Check for search param
        const params = new URLSearchParams(location.search);
        const searchId = params.get("search");
        if (searchId) {
          // Move searched course to top
          const idx = allCourses.findIndex(c => c._id === searchId);
          if (idx !== -1) {
            const searchedCourse = allCourses[idx];
            allCourses = [searchedCourse, ...allCourses.filter((c, i) => i !== idx)];
          }
        }
        setCourses(allCourses);
        // Fetch coupons
        // const couponsRes = await getCoupons();
        // setCoupons(couponsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.search]);

return (
  <>
    <div className="bg-green-200 py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          Available Courses
        </h1>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No courses available right now.
            </p>
          )}
        </div>
      </div>
    </div>
  </>
);

}
