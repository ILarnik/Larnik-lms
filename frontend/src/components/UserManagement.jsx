// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  getPartners,
  getReferral,
  getStudents,
  getSubAdmins, // ✅ corrected plural
  getTeachers,
  getUniversity,
} from "../api/api";
import UserManagementListDesign from "./UserManagementListDesign";
import StudentDashboardCards from "./cards/StudentDashboardCards";

export default function UserManagement(props) {
  // console.log(props, "props");
  
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let data = [];

      // ✅ normalize role (lowercase to avoid case mismatches)
      const role = props.role?.toLowerCase();

      if (role === "students") {
        const response = await getStudents();
        data = response.data;
        // console.log(data,"students");
      } else if (role === "teachers") {
        const response = await getTeachers();
        data = response.data;
      } else if (role === "university") {
        const response = await getUniversity();
        data = response.data;
      } else if (role === "referral") {
        const response = await getReferral();
        data = response.data;        
      } else if (role === "partners") {
        const response = await getPartners();
        data = response.data;
        // console.log(data,"partners");
      } else if (role === "subadmin" || role === "sub-admin") {
        const response = await getSubAdmins(); // ✅ corrected function name
        data = response.data;
      }
      setUserLists(data);
    } catch (err) {
      console.error(`Failed to fetch ${props.role}s:`, err);
      setUserLists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [props.role]); // refetch if role changes

  if (loading) return <div className="p-4">Loading {props.role}s...</div>;
  if (!userLists.length) return <div className="p-4">No {props.role} found</div>;

return (
  <div className="px-4 md:px-8 py-6">
    {/* Dashboard Cards */}
    <StudentDashboardCards role={props.role} />

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between my-6">
      <div className="mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold uppercase">{props.role} List</h2>
        <p className="text-sm text-gray-600">View and manage all {props.role} on your platform</p>
      </div>
    </div>

    {/* Table header (desktop) */}
    <div className="hidden md:flex bg-gray-200 rounded-lg px-4 py-3 font-semibold text-sm text-gray-800">
      <div className="w-2/5">Name</div>
      <div className="w-1/5">Phone</div>
      <div className="w-1/5">Status</div>
      <div className="w-1/5 text-right">Actions</div>
    </div>

    {/* Users list */}
    <div className="mt-3 space-y-3">
      {userLists.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-xl shadow-sm border md:border-0 p-4 md:p-2 flex flex-col md:flex-row md:items-center gap-3 md:gap-0"
        >
          {/* Name */}
          <div className="md:w-2/5">
            <div className="text-base font-semibold text-gray-900 truncate">
              {user.fullName || user.name || user.title || "Unnamed"}
            </div>
            <div className="text-xs text-gray-500 md:hidden mt-1">
              {user.email}
            </div>
          </div>

          {/* Phone */}
          <div className="md:w-1/5 text-sm text-gray-700">
            {user.phone || "—"}
          </div>

          {/* Status */}
          <div className="md:w-1/5">
            <span
              className={[
                "inline-block text-xs font-medium px-2 py-1 rounded-full",
                user.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : user.status === "Inactive"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-700",
              ].join(" ")}
            >
              {user.status || "Unknown"}
            </span>
          </div>

          {/* Actions */}
          <div className="md:w-1/5 flex items-center justify-end">
            {/* Keep your existing item component for actions/controls.
                Wrapped so it aligns nicely on all screen sizes. */}
            <UserManagementListDesign
              userId={user._id}
              name={user.fullName || user.name || user.title || "Unnamed"}
              mail={user.email}
              phone={user.phone}
              status_title={user.status}
              status_colour={user.status === "Active" ? "green" : "gray"}
              onActionComplete={fetchUsers}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
