import React, { useState } from "react";
import { createBlog } from "../../api/api"; // adjust path

export default function CreateBlog({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog({ title, content });
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      if (onCreated) onCreated();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating blog");
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-6 sm:p-10">
    {/* Page Header */}
    <div className="text-center mb-8 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
        ✍️ Create Blog
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-2">Share your thoughts with the world 🌍</p>
    </div>

    {/* Full-width Form */}
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100"
    >
      {/* Title */}
      <label className="block text-gray-700 font-semibold mb-2">Title</label>
      <input
        type="text"
        placeholder="Enter blog title..."
        className="border border-gray-300 rounded-lg w-full p-3 sm:p-4 mb-4 sm:mb-6 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-base sm:text-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Blog title"
      />

      {/* Content */}
      <label className="block text-gray-700 font-semibold mb-2">Content</label>
      <textarea
        placeholder="Write your blog content..."
        rows={8}
        className="border border-gray-300 rounded-lg w-full p-3 sm:p-4 mb-6 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-base sm:text-lg resize-vertical"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Blog content"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-auto mx-auto block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-base sm:text-lg"
      >
        🌿 Publish Blog
      </button>
    </form>
  </div>
);

}
