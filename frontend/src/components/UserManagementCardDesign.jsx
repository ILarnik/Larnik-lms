import { Users } from "lucide-react"
import React from "react"

export default function UserManagementCardDesign({
  title = "",
  value = "",
  subTitle = "",
  icon = Users,
}) {
  const IconComp = icon
return (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col p-5 gap-6 w-full max-w-sm">
    {/* Header */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-gray-800">{title}</span>
      <IconComp size={20} className="text-gray-600" />
    </div>

    {/* Content */}
    <div className="flex flex-col items-start">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span className="text-sm text-gray-500">{subTitle}</span>
    </div>
  </div>
);

}
