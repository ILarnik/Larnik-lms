import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getApproveCourses } from "../api/api";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch courses once on mount
    getApproveCourses().then(res => {
      setCourses(res.data || []);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses([]);
      setShowDropdown(false);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = courses.filter(c =>
      c.title?.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm, courses]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredCourses.length > 0) {
      // Navigate to /courses with first matched course
      window.location.href = `/courses?search=${filteredCourses[0]._id}`;
      setShowDropdown(false);
    }
  };

  const handleCourseClick = (courseId) => {
    // Navigate to /courses with selected courseId as query param
    window.location.href = `/courses?search=${courseId}`;
    setShowDropdown(false);
  };

  return (
    <div className="relative flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-2 m-4">
      {/* Revolutionary Learning Platform Badge - Left */}
      <div className="backdrop-blur-lg bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-gray-200">
        <p className="text-green-700 text-xs sm:text-sm font-medium">Revolutionary Learning Platform</p>
      </div>

      {/* Search Bar - Center */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-full max-w-md">
        <div className="flex items-center w-full px-4 py-2 rounded-full bg-white shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-green-400 transition">
          <Search className="text-green-500 mr-3 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm"
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(filteredCourses.length > 0)}
            autoComplete="off"
          />
        </div>
        {showDropdown && (
          <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer text-left"
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="font-semibold text-green-800">{course.title}</div>
                <div className="text-xs text-gray-600 line-clamp-1">{course.description}</div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="px-4 py-2 text-gray-500">No courses found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
