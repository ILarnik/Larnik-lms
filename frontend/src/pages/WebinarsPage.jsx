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
  <div className="space-y-10 px-4 sm:px-6 md:px-8">
    {/* Add Webinar Form */}
    <form
      onSubmit={handleAddWebinar}
      className="bg-white/80 backdrop-blur-md border border-green-200/50 shadow-lg rounded-2xl p-6 sm:p-8"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-700 flex items-center gap-2">
        <Video size={20} /> Add New Webinar
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />
        </div>

        {/* Date/Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={newWebinar.datetime}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, datetime: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto block sm:inline-flex justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
      >
        ➕ Add Webinar
      </button>
    </form>

    {/* Webinar List */}
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-700">
        🎥 Upcoming Webinars
      </h3>

      {webinars.length === 0 ? (
        <p className="text-center text-gray-600">No webinars available yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {webinars.map((w) => (
            <div
              key={w._id}
              className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-all flex flex-col"
            >
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">
                {w.title}
              </h4>

              <p className="text-sm text-gray-700 mb-1">
                🎤 <span className="font-medium">{w.speaker}</span>
              </p>

              <p className="text-sm text-gray-700 mb-1">
                📅{" "}
                <span className="font-medium">
                  {w.datetime ? new Date(w.datetime).toLocaleString() : "-"}
                </span>
              </p>

              <p className="text-sm text-gray-700 mb-3">📌 {w.mode}</p>

              {w.link && (
                <a
                  href={w.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-green-600 text-sm font-medium hover:underline break-words"
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
