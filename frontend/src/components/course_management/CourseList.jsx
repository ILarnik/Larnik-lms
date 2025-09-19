// // src/components/CourseList.jsx
// import React, { useEffect, useState } from "react";
// import { getApproveCourses, deleteCourse } from "../../api/api";

// export default function CourseList() {
//   const [courses, setCourses] = useState([]);

//   const fetchCourses = async () => {
//     const res = await getApproveCourses();
//     setCourses(res.data);
//     // console.log(res.data,"data");
//     // console.log(res.data.courseuniqueId,"resdata");
    
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this course?")) return;
//     await deleteCourse(id);
//     fetchCourses();
//   };

//   // { console.log(courses,"courses");}
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-2">Approved Courses</h2>
//       {courses.map((c) => {
//         // console.log(c,"courseee");
//         return (
//         <div key={c._id} className="border p-3 flex justify-between items-center rounded mb-2">
//           <div>
//             <h3 className="font-bold">{c.title}</h3>
//             <p>{c.description}</p>
//             <span className="text-sm text-gray-500">By: {c.createdBy?.name}</span>
//             <section className="text-md text-gray-500">Course unique id : {c.courseuniqueId}</section>
//           </div>
//           <button
//             onClick={() => handleDelete(c._id)}
//             className="bg-red-500 text-white px-3 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//         );
// })}
//     </div>
//   );




// }
  


// src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import { getApproveCourses, deleteCourse } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import CustomButton from "../ui/CustomButton";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await getApproveCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await deleteCourse(id);
    fetchCourses();
  };

  return (
    <ElevatedCard
      title="Approved Courses"
      subtitle="List of courses approved & live on the platform"
    >
      {courses.length === 0 && (
        <p className="text-gray-500 text-sm">No approved courses yet.</p>
      )}
      <div className="space-y-4">
        {courses.map((c) => (
          <div
            key={c._id}
            className="flex justify-between items-start border rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800"
          >
            <div>
              <h3 className="font-bold text-3xl uppercase">{c.title}</h3>
              <p className=" text-gray-600 text-2xl capitalize">{c.description}</p>
              <span className=" text-gray-500 block text-xl capitalize">
                By: {c.createdBy?.name || "Unknown"}
              </span>
              <span className="text-xs text-gray-500">
                Course ID: {c.courseuniqueId}
              </span>
            </div>
            {/* <button
              onClick={() => handleDelete(c._id)}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button> */}
            <CustomButton label={"Delete"} onClick={()=>handleDelete(c._id)} className={"bg-black"} />
          </div>
        ))}
      </div>
    </ElevatedCard>
  );
}
