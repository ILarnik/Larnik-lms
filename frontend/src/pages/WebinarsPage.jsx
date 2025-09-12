 import React, { useState, useEffect } from "react";
import { getWebinars, addWebinar } from "../api/api.jsx";

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

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await getWebinars();
        const webinarsArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setWebinars(webinarsArray);
      } catch (err) {
        console.error(err);
        setWebinars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, []);

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
      console.error(err);
    }
  };

  if (loading) return <p>Loading webinars...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Webinars</h3>

      <form onSubmit={handleAddWebinar} className="mb-6 p-4 border rounded">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            value={newWebinar.title}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, title: e.target.value })
            }
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Speaker"
            value={newWebinar.speaker}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, speaker: e.target.value })
            }
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="datetime-local"
            value={newWebinar.datetime}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, datetime: e.target.value })
            }
            className="border rounded px-2 py-1"
            required
          />
          <select
            value={newWebinar.mode}
            onChange={(e) => setNewWebinar({ ...newWebinar, mode: e.target.value })}
            className="border rounded px-2 py-1"
          >
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
            <option value="Offline">Offline</option>
          </select>
          <input
            type="text"
            placeholder="Link"
            value={newWebinar.link}
            onChange={(e) => setNewWebinar({ ...newWebinar, link: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Webinar
          </button>
        </div>
      </form>

      <table className="w-full text-left text-sm border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Speaker</th>
            <th className="p-2">Date / Time</th>
            <th className="p-2">Mode</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(webinars) &&
            webinars.map((w) => (
              <tr key={w._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{w.title}</td>
                <td className="p-2">{w.speaker}</td>
                <td className="p-2">
                  {w.datetime ? new Date(w.datetime).toLocaleString() : "-"}
                </td>
                <td className="p-2">{w.mode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
