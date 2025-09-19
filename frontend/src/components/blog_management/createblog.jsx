// import React, { useState } from "react";
// import { createBlog } from "../../api/api"; // adjust path

// export default function CreateBlog({ onCreated }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createBlog({ title, content });
//       alert("Blog created successfully!");
//       setTitle("");
//       setContent("");
//       if (onCreated) onCreated();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error creating blog");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Create Blog</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         className="border p-2 w-full mb-2"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Content"
//         className="border p-2 w-full mb-2"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Create Blog
//       </button>
//     </form>
//   );
// }



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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          ✍️ Create Blog
        </h1>
        <p className="text-gray-600 mt-2">Share your thoughts with the world 🌍</p>
      </div>

      {/* Full-width Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        {/* Title */}
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter blog title..."
          className="border border-gray-300 rounded-lg w-full p-4 mb-6 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <label className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          placeholder="Write your blog content..."
          rows="12"
          className="border border-gray-300 rounded-lg w-full p-4 mb-8 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-xl"
        >
          🌿 Publish Blog
        </button>
      </form>
    </div>
  );
}
