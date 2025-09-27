import React from "react";

export function Label({ htmlFor, children }) {
return (
  <label
    htmlFor={htmlFor}
    className="block text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 sm:mb-2"
  >
    {children}
  </label>
);

}

export function Input(props) {
return (
  <input
    {...props}
    className={[
      "w-full rounded-xl border border-neutral-300 dark:border-neutral-700",
      "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
      "px-3.5 py-2.5 text-sm sm:text-base", // ✅ responsive text size
      "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
      "focus:border-blue-500 transition-all duration-200",
      "disabled:opacity-60 disabled:cursor-not-allowed", // ✅ better disabled state
      props.className || ""
    ].join(" ")}
  />
);

}

export function Textarea(props) {
return (
  <textarea
    rows={props.rows ?? 4}
    {...props}
    className={[
      "w-full rounded-xl border border-neutral-300 dark:border-neutral-700",
      "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
      "px-3.5 py-2.5 text-sm sm:text-base", // ✅ responsive text sizing
      "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
      "focus:border-blue-500 transition-all duration-200",
      "resize-y", // ✅ keeps vertical resize only
      "disabled:opacity-60 disabled:cursor-not-allowed", // ✅ disabled state
      props.className || ""
    ].join(" ")}
  />
);

}

export function HelpText({ children }) {
return (
  <p
    className={[
      "mt-1 text-xs sm:text-sm", // ✅ responsive size
      "text-neutral-500 dark:text-neutral-400",
      "leading-relaxed", // ✅ improves readability if text wraps
      children.className || ""
    ].join(" ")}
  >
    {children}
  </p>
);

}

export function ErrorText({ children }) {
  if (!children) return null;
  return (
  <p
    className={[
      "mt-2 text-sm font-medium", // consistent spacing + weight
      "text-red-600 dark:text-red-500", // dark mode safe
      props.className || ""
    ].join(" ")}
  >
    {children}
  </p>
);

}
