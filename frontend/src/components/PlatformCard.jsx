import { Users } from "lucide-react";
import React from "react";

export default function PlatformCard({
    icon = Users,
    tittle = "Manage Users"
}) {
    
    const IconCopm = icon
return (
  <div
    className="w-[98%] h-24 flex flex-col gap-2 shadow-md rounded-2xl items-center justify-center 
               bg-white hover:bg-green-400 transition-colors duration-300 cursor-pointer"
  >
    {/* Icon */}
    <div className="flex items-center justify-center">
      <IconComp size={28} className="text-green-700" />
    </div>

    {/* Title */}
    <div>
      <span className="font-semibold text-sm text-gray-700">{title}</span>
    </div>
  </div>
);

}