import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api.jsx"; // adjust path if needed

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // for modal

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data } = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading)
    return <p className="p-10 text-center text-lg">⏳ Loading blogs...</p>;
  if (error)
    return <p className="p-10 text-center text-red-600">{error}</p>;

return (
  <div className="w-full relative overflow-hidden bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 min-h-screen py-12 sm:py-16">
    {/* Decorative blurred balls (hide on very small screens) */}
    <div className="hidden sm:block absolute top-10 left-10 w-36 h-36 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
    <div className="hidden md:block absolute bottom-20 right-20 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
    <div className="hidden md:block absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

    {/* Glass container */}
    <div className="relative z-10 mx-auto bg-white/30 backdrop-blur-md shadow-xl p-6 sm:p-10 border border-white/40 rounded-lg max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm">
          🌿 Our Blogs
        </h1>
        <p className="text-gray-700 mt-2 text-sm sm:text-lg">
          Explore stories, guides, and insights
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogs.length === 0 ? (
          <p className="text-center col-span-full text-gray-800 text-base sm:text-lg">
            No blogs yet. Check back soon! ✍️
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/40 p-5 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-words line-clamp-2">
                {blog.title}
              </h2>

              {/* Content Preview */}
              <p className="text-gray-700 mb-4 break-words line-clamp-4 text-sm sm:text-base leading-relaxed">
                {blog.content}
              </p>

              {/* Action Button */}
              <div className="mt-auto">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full sm:w-auto block text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:shadow-lg hover:scale-105 transition-all"
                >
                  🌟 Read More
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Modal for Blog Details */}
    {selectedBlog && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col relative">
          {/* Header with Title + Close Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 border-b border-gray-200 gap-3">
            <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 break-words pr-4">
              {selectedBlog.title}
            </h2>
            <button
              onClick={() => setSelectedBlog(null)}
              className="ml-0 sm:ml-4 text-gray-600 hover:text-red-500 text-xl sm:text-2xl rounded-full p-1"
              aria-label="Close blog modal"
            >
              ✖
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-6">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
