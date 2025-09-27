import React, { useState } from "react";
import StatusButton from "./StatusButton";
import { approveUserStatus, deleteUsers } from "../api/api"; // ✅ fixed import
import CustomButton from "./ui/CustomButton";

export default function UserManagementListDesign({
  userId,
  name,
  mail,
  phone,
  status_title,
  status_colour,
  onActionComplete, // parent refresh callback
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggleStatus = async () => {
    try {
      // ✅ Make sure case matches your DB ("Pending"/"Active")
      const newStatus = status_title === "Active" ? "Pending" : "Active";
      await approveUserStatus(userId, newStatus);
      onActionComplete?.(); // refresh parent list
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteUsers(userId); // ✅ fixed API call
      setShowConfirm(false);
      onActionComplete?.();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

return (
  <>
    <div className="bg-white border-t-2 border-black shadow-sm rounded-md overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 p-3 md:p-4">
        {/* Left: name + email */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="font-bold text-lg md:text-xl capitalize block truncate">
                {name}
              </span>
              <span className="text-sm text-gray-600 block truncate">{mail}</span>
            </div>

            {/* On small screens show status compactly on right */}
            <div className="md:hidden">
              <StatusButton title={status_title} colour={status_colour} />
            </div>
          </div>
        </div>

        {/* Middle: phone + status (desktop) */}
        <div className="flex items-center gap-4 w-full md:w-auto md:ml-4">
          <div className="w-full md:w-40 text-sm text-gray-700">
            <span className="hidden md:inline">Phone</span>
            <div className="md:block">+91-{phone || "—"}</div>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:w-36">
            <StatusButton title={status_title} colour={status_colour} />
          </div>
        </div>

        {/* Right: actions */}
        <div className="w-full md:w-auto flex items-center justify-end gap-2 mt-2 md:mt-0">
          <CustomButton
            onClick={handleToggleStatus}
            className={`px-3 py-1 rounded text-white ${
              status_title === "Active"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            label={status_title === "Active" ? "Set Pending" : "Approve"}
          />

          <CustomButton
            label={"Delete"}
            className={"bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"}
            onClick={() => setShowConfirm(true)}
          />
        </div>
      </div>
    </div>

    {/* Confirm Delete Modal */}
    {showConfirm && (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
          <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Do you really want to delete <b>{name}</b>? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <CustomButton
              label={"Cancel"}
              className={"bg-gray-300 text-black px-3 py-1 rounded"}
              onClick={() => setShowConfirm(false)}
            />
            <CustomButton
              label={"Confirm Delete"}
              className={"bg-red-600 px-3 py-1 rounded text-white"}
              onClick={confirmDelete}
            />
          </div>
        </div>
      </div>
    )}
  </>
);

}
