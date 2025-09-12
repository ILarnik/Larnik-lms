 import React, { useState, useEffect } from "react";
import { getGuides, addGuide } from "../api/api.jsx";

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGuide, setNewGuide] = useState({
    title: "",
    category: "",
  });

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await getGuides();
        const guidesArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setGuides(guidesArray);
      } catch (err) {
        console.error(err);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const handleAddGuide = async (e) => {
    e.preventDefault();
    try {
      const res = await addGuide(newGuide);
      setGuides((prev) => [res.data, ...prev]);
      setNewGuide({ title: "", category: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading guides...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Career Guides</h3>

      <form onSubmit={handleAddGuide} className="mb-6 p-4 border rounded">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Guide Title"
            value={newGuide.title}
            onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newGuide.category}
            onChange={(e) =>
              setNewGuide({ ...newGuide, category: e.target.value })
            }
            className="border rounded px-2 py-1"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Guide
          </button>
        </div>
      </form>

      <table className="w-full text-left text-sm border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(guides) &&
            guides.map((guide) => (
              <tr key={guide._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{guide.title}</td>
                <td className="p-2">{guide.category}</td>
                <td className="p-2">{guide.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
