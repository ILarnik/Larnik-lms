import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api.jsx"; // adjust path if needed

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="p-10 text-center">Loading blogs...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Our Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
            <button className="text-indigo-600 hover:underline text-sm">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
