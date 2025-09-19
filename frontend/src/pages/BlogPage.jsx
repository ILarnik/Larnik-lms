// import React, { useEffect, useState } from "react";
// import { getBlogs } from "../api/api.jsx"; // adjust path if needed

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const { data } = await getBlogs();
//         setBlogs(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load blogs");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   if (loading) return <p className="p-10 text-center">Loading blogs...</p>;
//   if (error) return <p className="p-10 text-center text-red-600">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <h1 className="text-3xl font-bold text-center mb-10">Our Blogs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//             <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>
//             <button className="text-indigo-600 hover:underline text-sm">
//               Read More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


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
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200">
      {/* Decorative blurred balls */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

      {/* Glass container */}
      <div className="relative z-10 mx-auto bg-white/30 backdrop-blur-md shadow-xl p-10 border border-white/40">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-sm">
            🌿 Our Blogs
          </h1>
          <p className="text-gray-700 mt-3 text-lg">
            Explore stories, guides, and insights
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <p className="text-center col-span-full text-gray-800 text-lg">
              No blogs yet. Check back soon! ✍️
            </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/40 p-6 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3 break-words line-clamp-2">
                  {blog.title}
                </h2>

                {/* Content Preview */}
                <p className="text-gray-700 mb-4 break-words line-clamp-4">
                  {blog.content}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:shadow-lg hover:scale-105 transition-all"
                >
                  🌟 Read More
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Blog Details */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl w-full h-[80vh] flex flex-col relative">
            
            {/* Header with Title + Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-extrabold text-gray-900 break-words pr-10">
                {selectedBlog.title}
              </h2>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-gray-600 hover:text-red-500 text-2xl"
              >
                ✖
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line break-words">
                {selectedBlog.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
