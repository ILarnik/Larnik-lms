// import { Calendar, Inbox, Send, Target,} from 'lucide-react';
// import React, { useState } from 'react';
// import UserManagementCardDesign from '../UserManagementCardDesign';

// export default function NotificationManagement() {
//   const [activeTab, setActiveTab] = useState("all");

//   const tabs = [
//     { id: "all", label: "Compose" },
//     { id: "history", label: "History" },
//     { id: "templetes", label: "Templetes" },
//   ];

//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const [target, setTarget] = useState('All Students');
//   const [schedule, setSchedule] = useState(false);

//   const audience = [
//     { name: 'All Students', count: 2380 },
//     { name: 'Active Students', count: 1847 },
//     { name: 'New Students', count: 156 },
//     { name: 'All Teachers', count: 78 },
//     { name: 'Top Performing Teachers', count: 23 },
//     { name: 'University Staff', count: 24 },
//     { name: 'Referral Partners', count: 12 },
//   ]

//   const studentCards = [
//     {
//       title : "Total Sent",
//       icon : Send,
//       subTitle : "This month",
//       value : "15,847",
//     },
//     {
//       title : "Average Open Rate",
//       icon : Inbox,
//       subTitle : "5.2% active rate",
//       value : "73.8%",
//     },
//     {
//       title : "Click Through Rate",
//       icon : Target,
//       subTitle : "2.% From Last Month",
//       value : "12.1%",
//     },
//     {
//       title : "Scheduled",
//       icon : Calendar,
//       subTitle : "Upcoming Notification",
//       value : "5",
//     },
//   ]

//   const history_data = [
//     {
//       title: "Course Enrollment Deadline",
//       desc: "Enroll now for the Advanced React course before t...",
//       type: "Email",
//       recipients: 1250,
//       sentDate: "2024-08-12 14:30",
//       status: "delivered",
//       openRate: "78.5%",
//       clickRate: "12.3%",
//     },
//     {
//       title: "New Course Available",
//       desc: "Check out our latest Python course for beginners.",
//       type: "Push",
//       recipients: 2380,
//       sentDate: "2024-08-11 09:15",
//       status: "delivered",
//       openRate: "65.2%",
//       clickRate: "8.7%",
//     },
//     {
//       title: "Settlement Processed",
//       desc: "Your earnings have been processed and transferred.",
//       type: "Sms",
//       recipients: 78,
//       sentDate: "2024-08-10 16:45",
//       status: "delivered",
//       openRate: "92.1%",
//       clickRate: "15.6%",
//     },
//     {
//       title: "System Maintenance",
//       desc: "Platform will be under maintenance on Sunday.",
//       type: "Email",
//       recipients: 2502,
//       sentDate: "2024-08-09 18:00",
//       status: "scheduled",
//       openRate: "-",
//       clickRate: "-",
//     },
//   ]

//   const templates = [
//     {
//       title: "Course Enrollment",
//       desc: "Notify about new course enrollments",
//       tag: "Academic",
//     },
//     {
//       title: "Payment Reminder",
//       desc: "Payment due date reminders",
//       tag: "Finance",
//     },
//     {
//       title: "Welcome Message",
//       desc: "Welcome new users to platform",
//       tag: "Onboarding",
//     },
//     {
//       title: "Course Completion",
//       desc: "Congratulate course completion",
//       tag: "Academic",
//     },
//     {
//       title: "System Maintenance",
//       desc: "Notify about system downtime",
//       tag: "System",
//     },
//     {
//       title: "Settlement Processed",
//       desc: "Payment settlement notifications",
//       tag: "Finance",
//     },
//   ]



//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//         {/* cards view  */}
//         <div className="flex flex-row gap-5 w-[full]   p-5">
//                         {studentCards.map((studentCard, index) => (
//                                 <UserManagementCardDesign key={index} title={studentCard.title} subTitle={studentCard.subTitle} icon={studentCard.icon} value={studentCard.value} />
                                
//                               ))}
//                         </div>
//         {/* cards view  */}
//       {/* Tab Buttons */}
//       <div className="flex space-x-2 bg-gray-100 rounded-full p-1 w-fit mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition 
//               ${activeTab === tab.id ? "bg-white shadow" : "text-gray-600"}`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Compose Tab */}
//       {activeTab === "all" && (
//         <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">


          
//           <div className="flex gap-5">
//             {/* Left Side */}
//             <div className="flex flex-col flex-1 p-5 border border-gray-300 rounded-lg items-start">
              
//               <div className='flex  flex-col items-center w-full'>
//               <h3 className="text-lg font-semibold mb-4">Compose Notification</h3>
//                   <p className="font-medium">Notification Type:</p>
//                   <div className='flex flex-row gap-5'>
//                   <label className="flex items-center gap-2">
//                     <input type="checkbox" defaultChecked /> Email
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input type="checkbox" /> Push
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input type="checkbox" /> SMS
//                   </label>
//                   </div>
//               </div>

//               <p className="font-medium mt-4">Target Audience:</p>
//               <select
//                 value={target}
//                 onChange={(e) => setTarget(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//               >
//                 {audience.map((a) => (
//                   <option key={a.name}>{a.name}</option>
//                 ))}
//               </select>

//               <p className="font-medium mt-4">Title/Subject:</p>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter title"
//                 className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                 />

//               <p className="font-medium mt-4">Message:</p>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Enter message"
//                 className="border border-gray-300 rounded-lg px-3 py-2 w-full h-28"
//                 />
//               <small className="text-gray-500">{message.length} characters</small>

//               <div className="mt-3">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={schedule}
//                     onChange={() => setSchedule(!schedule)}
//                     />
//                   Schedule for later
//                 </label>
//               </div>

//               <div className="flex gap-5 mt-4 h-10">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ">Send Now</button>
//                 <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">Save as Template</button>
//                 <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">Preview</button>
//               </div>
//             </div>

//             {/* Right Side */}
//             <div className="w-72 p-5 border border-gray-300 rounded-lg">
//               <h4 className="text-md font-semibold mb-3">Audience Segments</h4>
//               {audience.map((a) => (
//                 <div
//                 key={a.name}
//                 onClick={() => setTarget(a.name)}
//                 className={`cursor-pointer px-3 py-2 mb-2 rounded-lg transition text-start 
//                   ${target === a.name ? "bg-blue-50 border border-blue-200" : "bg-white border border-gray-200"}`}
//                   >
//                   <span>{a.name}</span>
//                   <span className="float-right text-gray-500">{a.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Compose Tab */}

//       {/* history Tab  */}
//       {activeTab === "history" && (
//         <div className="p-4 bg-white rounded-lg shadow text-start">
//         <h2 className="text-lg font-semibold">Notification History</h2>
//         <p className="text-gray-500 text-sm mb-4">
//           View and manage your sent notifications
//         </p>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">Title</th>
//               <th className="text-left py-2">Type</th>
//               <th className="text-left py-2">Recipients</th>
//               <th className="text-left py-2">Sent Date</th>
//               <th className="text-left py-2">Status</th>
//               <th className="text-left py-2">Open Rate</th>
//               <th className="text-left py-2">Click Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history_data.map((item, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50 text-start">
//                 <td className="py-2">
//                   <p className="font-medium">{item.title}</p>
//                   <p className="text-gray-500 text-xs">{item.desc}</p>
//                 </td>
//                 <td className="py-2">{item.type}</td>
//                 <td className="py-2">{item.recipients}</td>
//                 <td className="py-2">{item.sentDate}</td>
//                 <td className="py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs ${
//                       item.status === "delivered"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="py-2">{item.openRate}</td>
//                 <td className="py-2">{item.clickRate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       )}
//       {/* history Tab  */}

//       {/* Templates Tab  */}
//       {activeTab === "templetes" && (
//         <div className="p-4 bg-white rounded-lg shadow text-start">
//         <h2 className="text-lg font-semibold">Notification Templates</h2>
//         <p className="text-gray-500 text-sm mb-4">
//           Pre-built templates for common notifications
//         </p>
  
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {templates.map((item, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 flex flex-col justify-between"
//             >
//               <div>
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-semibold">{item.title}</h3>
//                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                     {item.tag}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500">{item.desc}</p>
//               </div>
  
//               <div className="flex gap-2 mt-4">
//                 <button className="flex-1 border rounded-md py-1 text-sm hover:bg-gray-50">
//                   Edit
//                 </button>
//                 <button className="flex-1 bg-black text-white rounded-md py-1 text-sm hover:bg-gray-800">
//                   Use Template
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       )}
//       {/* Templates Tab  */}


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
