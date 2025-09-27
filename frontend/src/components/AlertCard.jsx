import React from "react";

export default function AlertCard({
    
      title= "High Server Load",
      btn_name = "Warning",
      subtitle = "Server CPU is at 85%",
      data = "5 minutes",
      bgcolour= "yellow",
      ntmcolour= "yellow"
    }) {

return (
  <div className="w-full h-28 bg-white rounded-xl border border-yellow-700 shadow-lg flex flex-col justify-between p-3 hover:shadow-xl transition">
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-gray-800 truncate">{title}</span>
      {btn_name && (
        <span className="bg-green-200 text-green-800 py-0.5 px-2 rounded-xl text-xs font-medium whitespace-nowrap">
          {btn_name}
        </span>
      )}
    </div>

    {/* Body Section */}
    <div className="flex flex-col items-start gap-1">
      <span className="text-sm text-gray-700">{subtitle}</span>
      <span className="text-xs text-gray-500">{data}</span>
    </div>
  </div>
);

    
}