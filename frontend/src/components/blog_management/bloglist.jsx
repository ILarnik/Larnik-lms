import React, { useEffect, useState } from "react";
import { getBlogs } from "../../api/api";

export default function BlogList({ onDelete }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 p-6 sm:p-10">
    {/* Blurred background balls (hidden on very small screens) */}
    <div className="hidden sm:block absolute top-10 left-10 w-36 h-36 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
    <div className="hidden md:block absolute bottom-20 right-20 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
    <div className="hidden md:block absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />

    {/* Glass effect container */}
    <div className="relative z-10 max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-white/40">
      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-sm">
          📚 All Blogs
        </h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          Browse through your published stories
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {blogs.length === 0 ? (
          <p className="text-center col-span-full text-gray-800 text-base sm:text-lg">
            No blogs yet. Start writing your first post! ✍️
          </p>
        ) : (
          blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/40 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-transform flex flex-col"
            >
              {/* Title */}
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 break-words">
                {blog.title}
              </h3>

              {/* Content preview */}
              <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-4 break-words flex-1">
                {blog.content}
              </p>

              {/* Actions */}
              {onDelete && (
                <div className="mt-2">
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:shadow-lg transition"
                    aria-label={`Delete blog ${blog.title}`}
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  </div>
);

}
