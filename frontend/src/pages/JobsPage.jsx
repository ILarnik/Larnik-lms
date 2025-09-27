import React, { useState, useEffect } from "react";
import { getJobs, addJob } from "../api/api.jsx";
import { Briefcase } from "lucide-react";

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
        // ✅ your jobs are inside res.data.jobs
        const jobsArray = Array.isArray(res.data.jobs) ? res.data.jobs : [];
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
      setJobs((prev) => [res.data, ...prev]); // assumes API returns the created job object
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

  if (loading) return <p className="p-6 text-center">⏳ Loading jobs...</p>;

  return (
  <div className="space-y-10 px-4 sm:px-6 md:px-8">
    {/* Form Section */}
    <form
      onSubmit={handleAddJob}
      className="bg-white/80 backdrop-blur-md border border-green-200/50 shadow-lg rounded-2xl p-6 sm:p-8"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-700 flex items-center gap-2">
        <Briefcase size={20} /> Post a New Job
      </h3>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. Remote / New York"
            value={newJob.location}
            onChange={(e) =>
              setNewJob({ ...newJob, location: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Job Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            value={newJob.mode}
            onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Deadline
          </label>
          <input
            type="date"
            value={newJob.deadline}
            onChange={(e) =>
              setNewJob({ ...newJob, deadline: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            placeholder="Write a short job description..."
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition min-h-[120px] resize-vertical"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto block sm:inline-flex justify-center px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
      >
        ➕ Add Job
      </button>
    </form>

    {/* Job Listings Section */}
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-700">
        🌟 Available Jobs
      </h3>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-all flex flex-col"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {job.title}
              </h4>

              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {job.company || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {job.location || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Mode:</span> {job.mode}
                </p>
                <p>
                  <span className="font-medium">Deadline:</span>{" "}
                  {job.deadline ? new Date(job.deadline).toISOString().slice(0, 10) : "-"}
                </p>
                {job.salary && (
                  <p>
                    <span className="font-medium">Salary:</span> {job.salary}
                  </p>
                )}
                {job.eligibility && (
                  <p>
                    <span className="font-medium">Eligibility:</span>{" "}
                    {job.eligibility}
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 mb-3 mt-3">
                {job.description}
              </p>

              <button className="mt-auto w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
