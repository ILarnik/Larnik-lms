 import { Target } from "lucide-react";
import React, { useState, useEffect } from "react";
import CustomButton from "./ui/CustomButton";
import EnrollButton from "./EnrollButton";
import { getApproveCourses } from "../api/api";

export default function CardDesign({
  // for all
  course=null, // ✅ added
  userId=null, // ✅ added
  variant = "subscribe",
  width = "w-[260px]",
  height = "h-[300px]",
  corner = "rounded-2xl",
  bgColor = "bg-white",
  iconbgColor = "bg-green-700",
  shadow = "shadow-2xl",
  img = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  icon = Target,
  title = "Mission Driven",
  subsTitle = "Basic",
  btnName = "Enroll",
  price = "$9999999",
  description = "Democratizing quality education and making learning accessible to everyone, everywhere.",
  onClick, // ✅ added
}) {
  const Iconcomponent = icon;
return (
  <div
    className={[
      bgColor,
      width,
      // allow height prop but ensure min-height on small screens
      `${height || "min-h-[220px]"}`,
      corner,
      shadow,
      "mx-auto flex flex-col overflow-hidden rounded-2xl",
    ].join(" ")}
  >
    {variant === "course" ? (
      <>
        {/* Image */}
        <img
          src={img}
          alt={title || "course image"}
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-2xl"
        />

        {/* Title / Description */}
        <div className="px-4 py-3">
          <span className="block text-sm sm:text-base md:text-lg font-bold text-black truncate">
            {title}
          </span>
          <span className="block text-xs sm:text-sm text-gray-600 mt-1">
            {description}
          </span>
        </div>

        <hr className="border-t border-gray-200 mt-3" />

        {/* Price + Action */}
        <div className="px-4 pb-4 pt-3 w-full flex items-center justify-between gap-3">
          <span className="text-green-800 font-bold text-lg sm:text-xl">
            {price}
          </span>

          <div className="flex-shrink-0">
            {/* keep existing EnrollButton component usage */}
            {btnName && <EnrollButton course={course} userId={userId} />}
          </div>
        </div>
      </>
    ) : variant === "subscribe" ? (
      <>
        <div className="flex flex-col items-center justify-center w-full gap-3 p-6 text-center">
          <span className="text-lg sm:text-2xl font-bold">{subsTitle}</span>
          <span className="text-green-800 text-2xl sm:text-3xl font-bold">
            ₹{title}
          </span>
          <span className="text-sm text-gray-700">{description}</span>
          <span className="text-sm text-green-700">
            7 days Free Trial · 15 Days Money Back Guarantee
          </span>

          {btnName && (
            <button
              className="mt-3 w-3/4 sm:w-auto px-4 py-2 rounded-lg bg-green-800 text-white font-medium hover:bg-green-700 transition"
              onClick={onClick}
            >
              {btnName}
            </button>
          )}
        </div>
      </>
    ) : variant === "values" ? (
      <>
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-6 text-center">
          <div className={`${iconbgColor} w-14 h-14 rounded-xl flex items-center justify-center`}>
            <Iconcomponent color="white" size={24} />
          </div>
          <span className="text-lg sm:text-xl font-bold text-black">{title}</span>
          <span className="text-sm text-gray-700">{description}</span>
        </div>
      </>
    ) : variant === "profile" ? (
      <>
        <div className="flex flex-col items-center justify-center w-full h-full gap-3 p-6 text-center">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={img}
            alt={title || "profile image"}
          />
          <span className="text-lg font-bold text-black">{title}</span>
          {subsTitle && (
            <span className="text-xs font-medium bg-green-100 py-0.5 px-2 rounded-full text-green-800">
              {subsTitle}
            </span>
          )}
          <span className="text-sm text-gray-600 p-2">{description}</span>

          {btnName && (
            <button
              className="mt-2 px-3 py-1 rounded-md border border-gray-200 text-sm hover:bg-gray-50 transition"
              onClick={onClick}
            >
              {btnName}
            </button>
          )}
        </div>
      </>
    ) : (
      // fallback: render nothing but keep container
      <></>
    )}
  </div>
);

}
