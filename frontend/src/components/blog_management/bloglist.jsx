// import React, { useEffect, useState } from "react";
// import { getBlogs } from "../../api/api";

// export default function BlogList({ onDelete }) {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await getBlogs();
//         setBlogs(data);
//       } catch (error) {
//         console.error("Error fetching blogs", error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Blogs</h2>
//       {blogs.map((blog) => (
//         <div key={blog._id} className="border p-3 mb-3 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">{blog.title}</h3>
//           <p>{blog.content}</p>
//           {onDelete && (
//             <button
//               onClick={() => onDelete(blog._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded mt-2"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }



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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 p-10">
      {/* Blurred background balls */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Glass effect container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-white/40">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
            📚 All Blogs
          </h2>
          <p className="text-gray-700 mt-2">
            Browse through your published stories
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <p className="text-center col-span-full text-gray-800 text-lg">
              No blogs yet. Start writing your first post! ✍️
            </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/40 p-6 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {blog.title}
                </h3>

                {/* Content preview */}
                <p className="text-gray-700 mb-4 line-clamp-4">
                  {blog.content}
                </p>

                {/* Actions */}
                {onDelete && (
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:shadow-lg transition-all"
                  >
                    🗑 Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
