import React from "react";

export default function ProgressBar({ progress }) {
return (
  <div className="flex items-center space-x-2 w-full max-w-xs">
    {/* Progress container */}
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      {/* Filled part */}
      <div
        className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>

    {/* Percentage text */}
    <span className="text-sm font-semibold text-gray-700">{progress}%</span>
  </div>
);

}

