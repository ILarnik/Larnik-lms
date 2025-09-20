//  import React, { useState, useEffect } from "react";
// import { getJobs, addJob } from "../api/api.jsx";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Form state
//   const [newJob, setNewJob] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//     mode: "Internship",
//     deadline: "",
//   });

//   // Fetch jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await getJobs();
//         const jobsArray = Array.isArray(res.data)
//           ? res.data
//           : res.data.data || [];
//         setJobs(jobsArray);
//       } catch (err) {
//         console.error("Failed to fetch jobs:", err);
//         setJobs([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Handle form submission
//   const handleAddJob = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await addJob(newJob);
//       setJobs((prev) => [res.data, ...prev]); // prepend new job
//       setNewJob({
//         title: "",
//         company: "",
//         location: "",
//         description: "",
//         mode: "Internship",
//         deadline: "",
//       });
//     } catch (err) {
//       console.error("Failed to add job:", err);
//     }
//   };

//   if (loading) return <p>Loading jobs...</p>;

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4">Job Listings</h3>

//       {/* Job Form */}
//       <form onSubmit={handleAddJob} className="mb-6 p-4 border rounded">
//         <div className="flex flex-col gap-2">
//           <input
//             type="text"
//             placeholder="Job Title"
//             value={newJob.title}
//             onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
//             className="border rounded px-2 py-1"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Company"
//             value={newJob.company}
//             onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
//             className="border rounded px-2 py-1"
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={newJob.location}
//             onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
//             className="border rounded px-2 py-1"
//           />
//           <select
//             value={newJob.mode}
//             onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })}
//             className="border rounded px-2 py-1"
//           >
//             <option value="Full-time">Full-time</option>
//             <option value="Part-time">Part-time</option>
//             <option value="Internship">Internship</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//           </select>
//           <input
//             type="date"
//             value={newJob.deadline}
//             onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
//             className="border rounded px-2 py-1"
//           />
//           <textarea
//             placeholder="Job Description"
//             value={newJob.description}
//             onChange={(e) =>
//               setNewJob({ ...newJob, description: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Add Job
//           </button>
//         </div>
//       </form>

//       {/* Job Table */}
//       <table className="w-full text-left text-sm border">
//         <thead className="bg-gray-50 border-b">
//           <tr>
//             <th className="p-2">Title</th>
//             <th className="p-2">Company</th>
//             <th className="p-2">Location</th>
//             <th className="p-2">Mode</th>
//             <th className="p-2">Deadline</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(jobs) &&
//             jobs.map((job) => (
//               <tr key={job._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{job.title}</td>
//                 <td className="p-2">{job.company}</td>
//                 <td className="p-2">{job.location}</td>
//                 <td className="p-2">{job.mode}</td>
//                 <td className="p-2">
//                   {job.deadline
//                     ? new Date(job.deadline).toISOString().slice(0, 10)
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




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
    <div className="space-y-10">
      {/* Form Section */}
      <form
        onSubmit={handleAddJob}
        className="bg-white/80 backdrop-blur-md border border-green-200/50 shadow-lg rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
          <Briefcase size={22} /> Post a New Job
        </h3>

        {/* Inputs grid */}
        <div className="grid md:grid-cols-2 gap-6">
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition min-h-[100px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          ➕ Add Job
        </button>
      </form>

      {/* Job Listings Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-green-700">
          🌟 Available Jobs
        </h3>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
              >
                <h4 className="text-xl font-semibold text-gray-900 truncate">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Company:</span>{" "}
                  {job.company || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Location:</span>{" "}
                  {job.location || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Mode:</span> {job.mode}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Deadline:</span>{" "}
                  {job.deadline
                    ? new Date(job.deadline).toISOString().slice(0, 10)
                    : "-"}
                </p>
                {job.salary && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Salary:</span> {job.salary}
                  </p>
                )}
                {job.eligibility && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Eligibility:</span>{" "}
                    {job.eligibility}
                  </p>
                )}
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {job.description}
                </p>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition">
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
