import React, { useState, useEffect } from "react";
import { getGuides, addGuide } from "../api/api.jsx";
import { BookOpen } from "lucide-react";

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newGuide, setNewGuide] = useState({
    title: "",
    category: "",
  });

  // ✅ Fetch Guides
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await getGuides();
        const guidesArray = Array.isArray(res.data.guides)
          ? res.data.guides
          : [];
        setGuides(guidesArray);
      } catch (err) {
        console.error("Failed to fetch guides:", err);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  // ✅ Add Guide
  const handleAddGuide = async (e) => {
    e.preventDefault();
    try {
      const res = await addGuide(newGuide);
      // Append new guide to list
      setGuides((prev) => [res.data, ...prev]);
      setNewGuide({ title: "", category: "" });
    } catch (err) {
      console.error("Failed to add guide:", err);
    }
  };

  if (loading) return <p className="p-6 text-center">⏳ Loading guides...</p>;

return (
  <div className="space-y-10 px-4 sm:px-6">
    {/* Add Guide Form */}
    <form
      onSubmit={handleAddGuide}
      className="bg-white/80 backdrop-blur-md border border-green-200/50 shadow-lg rounded-2xl p-6 sm:p-8"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <BookOpen size={20} className="sm:w-6 sm:h-6" /> Add New Guide
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guide Title
          </label>
          <input
            type="text"
            placeholder="e.g. Resume Writing Tips"
            value={newGuide.title}
            onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Career Advice"
            value={newGuide.category}
            onChange={(e) =>
              setNewGuide({ ...newGuide, category: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
      >
        ➕ Add Guide
      </button>
    </form>

    {/* Guide List */}
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-700">
        📚 Available Guides
      </h3>

      {guides.length === 0 ? (
        <p className="text-center text-gray-600">
          No guides available yet. Add one above!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl shadow-md p-5 sm:p-6 hover:shadow-xl transition-all"
            >
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {guide.title}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Category:</span> {guide.category}
              </p>
              <p
                className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${
                  guide.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {guide.status || "draft"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
