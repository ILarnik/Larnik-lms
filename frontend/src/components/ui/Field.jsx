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
        "px-3.5 py-2.5 text-sm sm:text-base",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
        "focus:border-blue-500 transition-all duration-200",
        "disabled:opacity-60 disabled:cursor-not-allowed",
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
        "px-3.5 py-2.5 text-sm sm:text-base",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
        "focus:border-blue-500 transition-all duration-200",
        "resize-y",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        props.className || ""
      ].join(" ")}
    />
  );
}

// Add the missing Select component
export function Select({ children, className, ...props }) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-neutral-300 dark:border-neutral-700",
        "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
        "px-3.5 py-2.5 text-sm sm:text-base",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
        "focus:border-blue-500 transition-all duration-200",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "appearance-none", // Remove default dropdown arrow
        "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236B7280%22%20class%3D%22bi%20bi-chevron-down%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')]",
        "bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px]",
        className || ""
      ].join(" ")}
    >
      {children}
    </select>
  );
}

export function HelpText({ children, className }) {
  return (
    <p
      className={[
        "mt-1 text-xs sm:text-sm",
        "text-neutral-500 dark:text-neutral-400",
        "leading-relaxed",
        className || ""
      ].join(" ")}
    >
      {children}
    </p>
  );
}

// Fixed ErrorText component (removed props parameter issue)
export function ErrorText({ children, className }) {
  if (!children) return null;
  return (
    <p
      className={[
        "mt-2 text-sm font-medium",
        "text-red-600 dark:text-red-500",
        className || ""
      ].join(" ")}
    >
      {children}
    </p>
  );
}

// Bonus: Add additional useful form components

export function Checkbox({ label, id, className, ...props }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        {...props}
        className={[
          "h-4 w-4 rounded border-neutral-300 dark:border-neutral-700",
          "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400",
          "bg-white dark:bg-neutral-900",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className || ""
        ].join(" ")}
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export function Radio({ label, id, className, ...props }) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        {...props}
        className={[
          "h-4 w-4 border-neutral-300 dark:border-neutral-700",
          "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400",
          "bg-white dark:bg-neutral-900",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className || ""
        ].join(" ")}
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
    </div>
  );
}

// Form group component for better layout
export function FormGroup({ children, className }) {
  return (
    <div className={`space-y-1 ${className || ""}`}>
      {children}
    </div>
  );
}




// Add to your existing Field.js file

export function FileUpload({ label, accept, onChange, className }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">
        <label className="cursor-pointer">
          <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-neutral-500">Click to upload or drag and drop</p>
              <p className="text-xs text-neutral-400">PDF, DOC, DOCX (Max 10MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={onChange}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export function Toggle({ enabled, setEnabled, label }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        onClick={() => setEnabled(!enabled)}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
      {label && (
        <span className="ml-3 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
        </span>
      )}
    </div>
  );
}