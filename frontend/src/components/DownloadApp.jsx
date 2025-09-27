import React from "react";

export default function DownloadApp() {
return (
  <>
    <div className="h-64 bg-green-600 flex flex-col items-center justify-center gap-3 text-center px-4">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl text-white font-extrabold drop-shadow">
        📱 Learn Anytime, Anywhere
      </h1>

      {/* Subtext */}
      <span className="text-white/90 font-medium">
        Download our mobile app for on-the-go learning
      </span>

      {/* Download Button */}
      <a
        href="*"
        className="mt-4 bg-white text-green-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition"
      >
        Download App
      </a>
    </div>
  </>
);

    
}