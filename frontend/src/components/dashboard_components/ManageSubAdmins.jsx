// src/components/ManageSubAdmins.jsx
import React, { useEffect, useState } from "react";
import {
  createManager,
  getUsersByRole,
  deleteUser,
  updateSubRole,
} from "../../api/api";
import CustomButton from "../ui/CustomButton";

export default function ManageSubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    password: "",
    subAdminRole: "blog_manager",
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [tempRole, setTempRole] = useState("");

  const subAdminRoles = [
    "blog_manager",
    "finance_manager",
    "governance",
    "role_manager",
    "sub_admin",
  ];

  const fetchSubAdmins = async () => {
    try {
      setLoading(true);
      const res = await getUsersByRole("sub-admin");
      setSubAdmins(res.data.data || []);
    } catch (error) {
      console.error("Error fetching sub-admins", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createManager(newManager);
      setSubAdmins([...subAdmins, res.data.user]);
      setNewManager({
        name: "",
        email: "",
        password: "",
        subAdminRole: "blog_manager",
      });
    } catch (error) {
      console.error("Error creating manager", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-admin?"))
      return;
    try {
      await deleteUser(id);
      setSubAdmins(subAdmins.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleSaveRole = async (id) => {
    try {
      const res = await updateSubRole(id, tempRole);
      setSubAdmins(
        subAdmins.map((user) =>
          user._id === id
            ? { ...user, subAdminRole: res.data.subAdminRole }
            : user
        )
      );
      setEditingUserId(null);
      setTempRole("");
    } catch (error) {
      console.error("Error updating subAdminRole", error);
    }
  };

return (
  <div className="p-4 sm:p-6 md:p-8 w-full mx-auto max-w-5xl">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
      Manage Sub-Admins
    </h2>

    {/* Full-width Create Form */}
    <form
      onSubmit={handleCreate}
      className="mb-8 p-4 sm:p-6 bg-white shadow-xl rounded-xl w-full flex flex-col sm:flex-row flex-wrap gap-4 items-center"
    >
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded-md shadow-sm flex-1 min-w-[160px] w-full sm:w-auto"
        value={newManager.name}
        onChange={(e) =>
          setNewManager({ ...newManager, name: e.target.value })
        }
        required
        aria-label="Name"
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded-md shadow-sm flex-1 min-w-[160px] w-full sm:w-auto"
        value={newManager.email}
        onChange={(e) =>
          setNewManager({ ...newManager, email: e.target.value })
        }
        required
        aria-label="Email"
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded-md shadow-sm flex-1 min-w-[160px] w-full sm:w-auto"
        value={newManager.password}
        onChange={(e) =>
          setNewManager({ ...newManager, password: e.target.value })
        }
        required
        aria-label="Password"
      />
      <select
        className="border p-2 min-w-[150px] rounded-md shadow-sm w-full sm:w-auto"
        value={newManager.subAdminRole}
        onChange={(e) =>
          setNewManager({ ...newManager, subAdminRole: e.target.value })
        }
        aria-label="Sub admin role"
      >
        {subAdminRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <div className="w-full sm:w-auto">
        <CustomButton label={"Create Manager"} className={"bg-black w-full sm:w-auto"} />
      </div>
    </form>

    {/* Full-width Sub-Admins List */}
    {loading ? (
      <p className="text-center text-gray-600">Loading sub-admins...</p>
    ) : (
      <div className="space-y-4">
        {subAdmins.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-lg transition gap-4"
          >
            {/* Avatar + Details */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-lg font-bold text-orange-600 flex-shrink-0">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 uppercase truncate">
                  {user.name}
                </h4>
                <p className="text-sm sm:text-base text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role Section */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {editingUserId === user._id ? (
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <select
                    value={tempRole}
                    onChange={(e) => setTempRole(e.target.value)}
                    className="border p-2 rounded-md shadow-sm"
                    aria-label={`Select role for ${user.name}`}
                  >
                    {subAdminRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <CustomButton onClick={() => handleSaveRole(user._id)} label={"Save"} className={"bg-green-700"} />
                    <CustomButton onClick={() => setEditingUserId(null)} label={"Cancel"} className={"bg-yellow-600"} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-400/10 px-3 py-2 rounded-full">
                  <span className="font-medium text-gray-700">
                    {user.subAdminRole}
                  </span>
                  <CustomButton
                    onClick={() => {
                      setEditingUserId(user._id);
                      setTempRole(user.subAdminRole);
                    }}
                    label={"Change"}
                    className={"bg-blue-700"}
                  />
                </div>
              )}
            </div>

            {/* Delete Button */}
            <div className="w-full sm:w-auto flex-shrink-0">
              <CustomButton onClick={() => handleDelete(user._id)} label={"Delete"} className={"bg-red-600 w-full sm:w-auto"} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
