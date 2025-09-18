// // src/components/ApproveCourse.jsx
// import React, { useState, useEffect } from "react";
// import { getCourses, approveCourses } from "../../api/api";

// export default function ApproveCourse() {
//   const [courses, setCourses] = useState([]);

//   const fetchCourses = async () => {
//     const res = await getCourses();
//     setCourses(res.data);
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleApprove = async (id, action) => {
//     await approveCourses(id, action);
//     fetchCourses();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Courses List</h2>
//       {courses.map((c) => (
//         <div key={c._id} className="border p-3 rounded mb-2">
//           <h3 className="font-bold">{c.title}</h3>
//           <p>{c.description}</p>
//           <div className="mt-2 flex gap-2">
//             <button
//               onClick={() => handleApprove(c._id, "approved")}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               Approve
//             </button>
//             <button
//               onClick={() => handleApprove(c._id, "rejected")}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// src/components/ApproveCourse.jsx
import React, { useState, useEffect } from "react";
import { getCourses, approveCourses } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import CustomButton from "../ui/CustomButton";

export default function ApproveCourse() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApprove = async (id, action) => {
    await approveCourses(id, action);
    fetchCourses();
  };

  return (
    <ElevatedCard
      title="Approve Courses"
      subtitle="Review pending courses and approve or reject"
    >
      {courses.length === 0 && (
        <p className="text-gray-500 text-sm">No courses pending approval.</p>
      )}
      <div className="grid gap-4">
        {courses.map((c) => (
          <div
            key={c._id}
            className="border rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800"
          >
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{c.description}</p>
            <div className="flex gap-3">
              {/* <button
                onClick={() => handleApprove(c._id, "approved")}
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Approve
              </button> */}
              <CustomButton onClick={()=>handleApprove(c._id,"approved")} label={"Approve"} className={"bg-black"} />
              {/* <button
                onClick={() => handleApprove(c._id, "rejected")}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Reject
              </button> */}
              <CustomButton onClick={() => handleApprove(c._id, "rejected")} label={"Reject"} className={"bg-red-700"} />
            </div>
          </div>
        ))}
      </div>
    </ElevatedCard>
  );
}
