import React from "react";

export default function ElevatedCard({ title, subtitle, rightSlot, children }) {
return (
  <section className="w-full px-2 sm:px-4 md:px-0">
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-neutral-200/70 dark:border-neutral-800/60">
      {(title || subtitle || rightSlot) && (
        <header className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200/70 dark:border-neutral-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div>
            {title && (
              <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {rightSlot}
        </header>
      )}
      <div className="p-4 sm:p-6 md:p-8">{children}</div>
    </div>
  </section>
);

}
