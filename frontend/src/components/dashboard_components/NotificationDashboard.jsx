import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Trash2, Info, AlertTriangle, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import CustomButton from "../ui/CustomButton";

export default function NotificationDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy notifications
  const dummyNotifications = [
    {
      _id: "1",
      title: "New Course Added",
      message: "A new course 'React for Beginners' has been added.",
      read: false,
      type: "info",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Payment Received",
      message: "You received ₹500 from John Doe.",
      read: true,
      type: "success",
      createdAt: new Date(Date.now() - 3600 * 1000),
    },
    {
      _id: "3",
      title: "Certificate Issued",
      message: "Certificate issued to Jane Smith.",
      read: false,
      type: "warning",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000),
    },
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setNotifications(dummyNotifications);
      }, 500); // simulate API delay
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, read: true } : notif
      )
    );
    toast.success("Marked as read");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    toast.success("Notification deleted");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  // Badge and icon based on type
  const getBadgeAndIcon = (type) => {
    switch (type) {
      case "success":
        return { badge: "bg-green-100 text-green-800", icon: <Check size={16} /> };
      case "warning":
        return { badge: "bg-yellow-100 text-yellow-800", icon: <AlertTriangle size={16} /> };
      case "info":
      default:
        return { badge: "bg-blue-100 text-blue-800", icon: <Info size={16} /> };
    }
  };

  // Split notifications
  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

return (
  <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-green-700">
          <Bell size={28} /> <span>Notification Dashboard</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <CustomButton
            label="Mark All Read"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleMarkAllRead}
          />
          <CustomButton
            label="Clear All"
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
            onClick={handleClearAll}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
          <Bell size={40} className="mx-auto mb-2 text-green-400" />
          <p className="font-medium">No notifications yet.</p>
          <p className="text-sm text-gray-400">All your notifications will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {unreadNotifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Unread Notifications</h3>
              <div className="space-y-4">
                {unreadNotifications.map((notif) => {
                  const { badge, icon } = getBadgeAndIcon(notif.type);
                  return (
                    <div
                      key={notif._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-green-50 transition transform hover:shadow-lg"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
                            {notif.type.toUpperCase()}
                          </span>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            {icon} <span className="break-words">{notif.title}</span>
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm mt-2">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-0 flex gap-2">
                        <CustomButton onClick={() => handleMarkAsRead(notif._id)} className={"bg-green-500"}>
                          <CheckCircle size={16} className="inline-block mr-2" /> Mark Read
                        </CustomButton>

                        <CustomButton onClick={() => handleDelete(notif._id)} className={"bg-red-700"}>
                          <Trash2 className="inline-block mr-2" size={16} /> Delete
                        </CustomButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {readNotifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Read Notifications</h3>
              <div className="space-y-4">
                {readNotifications.map((notif) => {
                  const { badge, icon } = getBadgeAndIcon(notif.type);
                  return (
                    <div
                      key={notif._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-white transition transform hover:shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
                            {notif.type.toUpperCase()}
                          </span>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            {icon} <span className="break-words">{notif.title}</span>
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm mt-2">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-0 flex gap-2">
                        <CustomButton label={"Delete"} onClick={() => handleDelete(notif._1d)} className={"bg-black"}>
                          <Trash2 size={16} className="inline-block" />
                        </CustomButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

}
 