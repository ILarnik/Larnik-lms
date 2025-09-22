 
// import React, { useState, useEffect } from "react";
// import { Bell, CheckCircle, Trash2, Info, AlertTriangle, Check } from "lucide-react";
// import { toast } from "react-hot-toast";
// import CustomButton from "../ui/CustomButton";

// export default function NotificationDashboard() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Dummy notifications
//   const dummyNotifications = [
//     {
//       _id: "1",
//       title: "New Course Added",
//       message: "A new course 'React for Beginners' has been added.",
//       read: false,
//       type: "info",
//       createdAt: new Date(),
//     },
//     {
//       _id: "2",
//       title: "Payment Received",
//       message: "You received ₹500 from John Doe.",
//       read: true,
//       type: "success",
//       createdAt: new Date(Date.now() - 3600 * 1000),
//     },
//     {
//       _id: "3",
//       title: "Certificate Issued",
//       message: "Certificate issued to Jane Smith.",
//       read: false,
//       type: "warning",
//       createdAt: new Date(Date.now() - 2 * 3600 * 1000),
//     },
//   ];

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       setTimeout(() => {
//         setNotifications(dummyNotifications);
//       }, 500); // simulate API delay
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((notif) =>
//         notif._id === id ? { ...notif, read: true } : notif
//       )
//     );
//     toast.success("Marked as read");
//   };

//   const handleMarkAllRead = () => {
//     setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
//     toast.success("All notifications marked as read");
//   };

//   const handleDelete = (id) => {
//     setNotifications((prev) => prev.filter((notif) => notif._id !== id));
//     toast.success("Notification deleted");
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     toast.success("All notifications cleared");
//   };

//   // Badge and icon based on type
//   const getBadgeAndIcon = (type) => {
//     switch (type) {
//       case "success":
//         return { badge: "bg-green-100 text-green-800", icon: <Check size={16} /> };
//       case "warning":
//         return { badge: "bg-yellow-100 text-yellow-800", icon: <AlertTriangle size={16} /> };
//       case "info":
//       default:
//         return { badge: "bg-blue-100 text-blue-800", icon: <Info size={16} /> };
//     }
//   };

//   // Split notifications
//   const unreadNotifications = notifications.filter((n) => !n.read);
//   const readNotifications = notifications.filter((n) => n.read);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700">
//           <Bell size={28} /> Notification Dashboard
//         </h2>
//         <div className="flex gap-2">
//           <CustomButton
//             label="Mark All Read"
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//             onClick={handleMarkAllRead}
//           />
//           <CustomButton
//             label="Clear All"
//             className="bg-red-500 hover:bg-red-600 text-white"
//             onClick={handleClearAll}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading notifications...</p>
//       ) : notifications.length === 0 ? (
//         <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
//           <Bell size={40} className="mx-auto mb-2 text-green-400" />
//           <p className="font-medium">No notifications yet.</p>
//           <p className="text-sm text-gray-400">All your notifications will appear here.</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {unreadNotifications.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-2 text-gray-700">Unread Notifications</h3>
//               <div className="space-y-4">
//                 {unreadNotifications.map((notif) => {
//                   const { badge, icon } = getBadgeAndIcon(notif.type);
//                   return (
//                     <div
//                       key={notif._id}
//                       className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-green-50 transition transform hover:scale-[1.1]"
//                     >
//                       <div className="flex flex-col gap-1">
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
//                             {notif.type.toUpperCase()}
//                           </span>
//                           <h3 className="font-semibold text-gray-800 flex items-center gap-1">
//                             {icon} {notif.title}
//                           </h3>
//                         </div>
//                         <p className="text-gray-600 text-sm">{notif.message}</p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {new Date(notif.createdAt).toLocaleString()}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         {/* <button
//                           onClick={() => handleMarkAsRead(notif._id)}
//                           className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600 transition"
//                         >
//                           <CheckCircle size={16} /> Mark Read
//                         </button> */}
//                         <CustomButton onClick={() => handleMarkAsRead(notif._id)} className={"bg-green-500"}><CheckCircle size={16} className="inline-block" /> Mark Read</CustomButton>
//                         {/* <button
//                           onClick={() => handleDelete(notif._id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
//                         >
//                           <Trash2 size={16} /> Delete
//                         </button> */}
//                         <CustomButton onClick={() => handleDelete(notif._id)} className={"bg-red-700"}><Trash2 className="inline-block" size={16} /> Delete</CustomButton>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {readNotifications.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-2 text-gray-700">Read Notifications</h3>
//               <div className="space-y-4">
//                 {readNotifications.map((notif) => {
//                   const { badge, icon } = getBadgeAndIcon(notif.type);
//                   return (
//                     <div
//                       key={notif._id}
//                       className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-white transition transform hover:scale-[1.01]"
//                     >
//                       <div className="flex flex-col gap-1">
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
//                             {notif.type.toUpperCase()}
//                           </span>
//                           <h3 className="font-semibold text-gray-800 flex items-center gap-1">
//                             {icon} {notif.title}
//                           </h3>
//                         </div>
//                         <p className="text-gray-600 text-sm">{notif.message}</p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {new Date(notif.createdAt).toLocaleString()}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         {/* <button
//                           onClick={() => handleDelete(notif._id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
//                         >
//                           <Trash2 size={16} /> Delete
//                         </button> */}
//                         <CustomButton label={"Delete"} onClick={() => handleDelete(notif._id)} className={"bg-black"} ><Trash2 size={26} /></CustomButton>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// src/components/dashboard_components/NotificationsDashboard.jsx
// import React, { useState } from "react";
// import { Card, CardContent } from "./ui/card.jsx";
// import { Button } from "./ui/button.jsx";
// import { Input } from "./ui/input.jsx";
// import { Textarea } from "./ui/textarea.jsx";
// import { Mail, MessageSquare, Send } from "lucide-react";
// import { toast } from "react-hot-toast";

// const NotificationsDashboard = () => {
//   const [notificationType, setNotificationType] = useState("email"); // "email" | "sms"
//   const [recipients, setRecipients] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendBulk = async () => {
//     if (!recipients || !message) {
//       toast.error("Recipients and message are required!");
//       return;
//     }

//     setLoading(true);
//     try {
//       // API call to backend
//       const response = await fetch("/api/notifications/send-bulk", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type: notificationType,
//           recipients: recipients.split(","), // comma-separated list
//           subject,
//           message,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success("Bulk notifications sent successfully!");
//         setRecipients("");
//         setSubject("");
//         setMessage("");
//       } else {
//         toast.error("Failed to send notifications");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error sending notifications");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 grid gap-6">
//       <h2 className="text-2xl font-bold">📢 Notifications Dashboard</h2>

//       <Card className="shadow-lg rounded-2xl">
//         <CardContent className="p-6 grid gap-4">
//           {/* Notification Type Switch */}
//           <div className="flex gap-4">
//             <Button
//               variant={notificationType === "email" ? "default" : "outline"}
//               onClick={() => setNotificationType("email")}
//             >
//               <Mail className="mr-2 h-4 w-4" /> Email
//             </Button>
//             <Button
//               variant={notificationType === "sms" ? "default" : "outline"}
//               onClick={() => setNotificationType("sms")}
//             >
//               <MessageSquare className="mr-2 h-4 w-4" /> SMS
//             </Button>
//           </div>

//           {/* Recipients */}
//           <div>
//             <label className="block mb-2 font-semibold">Recipients (comma-separated)</label>
//             <Input
//               placeholder="example1@gmail.com, example2@gmail.com"
//               value={recipients}
//               onChange={(e) => setRecipients(e.target.value)}
//             />
//           </div>

//           {/* Subject (only for email) */}
//           {notificationType === "email" && (
//             <div>
//               <label className="block mb-2 font-semibold">Subject</label>
//               <Input
//                 placeholder="Enter subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//               />
//             </div>
//           )}

//           {/* Message */}
//           <div>
//             <label className="block mb-2 font-semibold">Message</label>
//             <Textarea
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               rows={5}
//             />
//           </div>

//           {/* Send Button */}
//           <Button
//             onClick={handleSendBulk}
//             disabled={loading}
//             className="bg-green-600 hover:bg-green-700 text-white"
//           >
//             <Send className="mr-2 h-4 w-4" />
//             {loading ? "Sending..." : "Send Bulk Notifications"}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default NotificationsDashboard;



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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700">
          <Bell size={28} /> Notification Dashboard
        </h2>
        <div className="flex gap-2">
          <CustomButton
            label="Mark All Read"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleMarkAllRead}
          />
          <CustomButton
            label="Clear All"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleClearAll}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading notifications...</p>
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
                      className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-green-50 transition transform hover:scale-[1.1]"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
                            {notif.type.toUpperCase()}
                          </span>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                            {icon} {notif.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {/* <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600 transition"
                        >
                          <CheckCircle size={16} /> Mark Read
                        </button> */}
                        <CustomButton onClick={() => handleMarkAsRead(notif._id)} className={"bg-green-500"}><CheckCircle size={16} className="inline-block" /> Mark Read</CustomButton>
                        {/* <button
                          onClick={() => handleDelete(notif._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button> */}
                        <CustomButton onClick={() => handleDelete(notif._id)} className={"bg-red-700"}><Trash2 className="inline-block" size={16} /> Delete</CustomButton>
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
                      className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-white transition transform hover:scale-[1.01]"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>
                            {notif.type.toUpperCase()}
                          </span>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                            {icon} {notif.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {/* <button
                          onClick={() => handleDelete(notif._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button> */}
                        <CustomButton label={"Delete"} onClick={() => handleDelete(notif._id)} className={"bg-black"} ><Trash2 size={26} /></CustomButton>
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
  );
}
 