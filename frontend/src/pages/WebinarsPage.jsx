//  import React, { useState, useEffect } from "react";
// import { getWebinars, addWebinar } from "../api/api.jsx";

// export default function WebinarsPage() {
//   const [webinars, setWebinars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [newWebinar, setNewWebinar] = useState({
//     title: "",
//     speaker: "",
//     datetime: "",
//     mode: "Zoom",
//     link: "",
//   });

//   useEffect(() => {
//     const fetchWebinars = async () => {
//       try {
//         const res = await getWebinars();
//         const webinarsArray = Array.isArray(res.data)
//           ? res.data
//           : res.data.data || [];
//         setWebinars(webinarsArray);
//       } catch (err) {
//         console.error(err);
//         setWebinars([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWebinars();
//   }, []);

//   const handleAddWebinar = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await addWebinar(newWebinar);
//       setWebinars((prev) => [res.data, ...prev]);
//       setNewWebinar({
//         title: "",
//         speaker: "",
//         datetime: "",
//         mode: "Zoom",
//         link: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading webinars...</p>;

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">Webinars</h3>

//       <form onSubmit={handleAddWebinar} className="mb-6 p-4 border rounded">
//         <div className="flex flex-col gap-2">
//           <input
//             type="text"
//             placeholder="Title"
//             value={newWebinar.title}
//             onChange={(e) =>
//               setNewWebinar({ ...newWebinar, title: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Speaker"
//             value={newWebinar.speaker}
//             onChange={(e) =>
//               setNewWebinar({ ...newWebinar, speaker: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//             required
//           />
//           <input
//             type="datetime-local"
//             value={newWebinar.datetime}
//             onChange={(e) =>
//               setNewWebinar({ ...newWebinar, datetime: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//             required
//           />
//           <select
//             value={newWebinar.mode}
//             onChange={(e) => setNewWebinar({ ...newWebinar, mode: e.target.value })}
//             className="border rounded px-2 py-1"
//           >
//             <option value="Zoom">Zoom</option>
//             <option value="Google Meet">Google Meet</option>
//             <option value="Offline">Offline</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Link"
//             value={newWebinar.link}
//             onChange={(e) => setNewWebinar({ ...newWebinar, link: e.target.value })}
//             className="border rounded px-2 py-1"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Add Webinar
//           </button>
//         </div>
//       </form>

//       <table className="w-full text-left text-sm border">
//         <thead className="bg-gray-50 border-b">
//           <tr>
//             <th className="p-2">Title</th>
//             <th className="p-2">Speaker</th>
//             <th className="p-2">Date / Time</th>
//             <th className="p-2">Mode</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(webinars) &&
//             webinars.map((w) => (
//               <tr key={w._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{w.title}</td>
//                 <td className="p-2">{w.speaker}</td>
//                 <td className="p-2">
//                   {w.datetime ? new Date(w.datetime).toLocaleString() : "-"}
//                 </td>
//                 <td className="p-2">{w.mode}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { getWebinars, addWebinar } from "../api/api.jsx";
import { Video } from "lucide-react";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newWebinar, setNewWebinar] = useState({
    title: "",
    speaker: "",
    datetime: "",
    mode: "Zoom",
    link: "",
  });

  // ✅ Fetch Webinars
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await getWebinars();
        const webinarsArray = Array.isArray(res.data.webinars)
          ? res.data.webinars
          : [];
        setWebinars(webinarsArray);
      } catch (err) {
        console.error("Failed to fetch webinars:", err);
        setWebinars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, []);

  // ✅ Add Webinar
  const handleAddWebinar = async (e) => {
    e.preventDefault();
    try {
      const res = await addWebinar(newWebinar);
      setWebinars((prev) => [res.data, ...prev]);
      setNewWebinar({
        title: "",
        speaker: "",
        datetime: "",
        mode: "Zoom",
        link: "",
      });
    } catch (err) {
      console.error("Failed to add webinar:", err);
    }
  };

  if (loading) return <p className="p-6 text-center">⏳ Loading webinars...</p>;

  return (
    <div className="space-y-10">
      {/* Add Webinar Form */}
      <form
        onSubmit={handleAddWebinar}
        className="bg-white/80 backdrop-blur-md border border-green-200/50 shadow-lg rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
          <Video size={22} /> Add New Webinar
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webinar Title
            </label>
            <input
              type="text"
              placeholder="e.g. Mastering Interview Skills"
              value={newWebinar.title}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
              required
            />
          </div>

          {/* Speaker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speaker
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={newWebinar.speaker}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, speaker: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
              required
            />
          </div>

          {/* Date/Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={newWebinar.datetime}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, datetime: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
              required
            />
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mode
            </label>
            <select
              value={newWebinar.mode}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, mode: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="Zoom">Zoom</option>
              <option value="Google Meet">Google Meet</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Link */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webinar Link
            </label>
            <input
              type="text"
              placeholder="e.g. https://zoom.us/j/123456789"
              value={newWebinar.link}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, link: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          ➕ Add Webinar
        </button>
      </form>

      {/* Webinar List */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-green-700">
          🎥 Upcoming Webinars
        </h3>

        {webinars.length === 0 ? (
          <p className="text-center text-gray-600">
            No webinars available yet. Add one above!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((w) => (
              <div
                key={w._id}
                className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {w.title}
                </h4>
                <p className="text-sm text-gray-700 mb-1">
                  🎤 <span className="font-medium">{w.speaker}</span>
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  📅 {w.datetime ? new Date(w.datetime).toLocaleString() : "-"}
                </p>
                <p className="text-sm text-gray-700 mb-3">📌 {w.mode}</p>
                {w.link && (
                  <a
                    href={w.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    🔗 Join Webinar
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
