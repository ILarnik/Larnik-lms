import { TrendingUp, Users } from "lucide-react";
import React from "react";

export default function DashboardCard({
    title = "45,892",
    subtitle = "Total Users",
    data = "12",
    icon = Users ,
    colour = "blue"
}) {
    
    const IconComp = icon
return (
  <>
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="bg-white shadow-2xl rounded-xl h-32 flex items-center justify-between p-4">
        <div className="flex flex-col items-start justify-center gap-0.5 min-w-0">
          <span className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{title}</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-600 truncate">{subtitle}</span>
          <span className="flex items-center gap-1 text-sm text-green-700">
            <TrendingUp size={16} color="green" />
            <span className="font-medium">+{data}%</span>
          </span>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center rounded-2xl bg-black/10 shadow-xl w-12 h-12">
          <IconComp color={colour} />
        </div>
      </div>
    </div>
  </>
);

    
    
}