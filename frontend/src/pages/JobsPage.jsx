 import React, { useState, useEffect } from "react";
import { getJobs, addJob } from "../api/api.jsx";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    mode: "Internship",
    deadline: "",
  });

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        const jobsArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setJobs(jobsArray);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle form submission
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const res = await addJob(newJob);
      setJobs((prev) => [res.data, ...prev]); // prepend new job
      setNewJob({
        title: "",
        company: "",
        location: "",
        description: "",
        mode: "Internship",
        deadline: "",
      });
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Job Listings</h3>

      {/* Job Form */}
      <form onSubmit={handleAddJob} className="mb-6 p-4 border rounded">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <select
            value={newJob.mode}
            onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })}
            className="border rounded px-2 py-1"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
          </select>
          <input
            type="date"
            value={newJob.deadline}
            onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <textarea
            placeholder="Job Description"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            className="border rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Job
          </button>
        </div>
      </form>

      {/* Job Table */}
      <table className="w-full text-left text-sm border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Company</th>
            <th className="p-2">Location</th>
            <th className="p-2">Mode</th>
            <th className="p-2">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.company}</td>
                <td className="p-2">{job.location}</td>
                <td className="p-2">{job.mode}</td>
                <td className="p-2">
                  {job.deadline
                    ? new Date(job.deadline).toISOString().slice(0, 10)
                    : "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
