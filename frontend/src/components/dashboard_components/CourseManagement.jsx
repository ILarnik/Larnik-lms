 

import React from "react";
import ApproveCourse from "../course_management/ApproveCourse";
import CourseList from "../course_management/CourseList";
import CreateCourse from "../course_management/CreateCourse";
import ManageModules from "../course_management/ManageModules";
import SubmitExam from "../course_management/SubmitExam";
// import CreateCourse from "./CreateCourse";
// import CourseList from "./CourseList";
// import ApproveCourse from "./ApproveCourse";
// import ManageModules from "./ManageModules";
// import SubmitExam from "./SubmitExam";

export default function CourseDashboard() {
return (
  <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
    <CreateCourse onCreated={() => window.location.reload()} />
    <CourseList />
    <ApproveCourse />
    <ManageModules courseId="<courseId_here>" />
    <SubmitExam courseId="<courseId_here>" />
  </div>
);

}
