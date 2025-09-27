import React from 'react'

export default function StatusButton(
    {
        title = "active",
        colour = "yellow"
    }
) {

return (
  <div>
    <span
      className="inline-block px-3 py-1 rounded-lg capitalize text-sm font-semibold text-white shadow-sm"
      style={{ backgroundColor: colour }}
    >
      {title}
    </span>
  </div>
);

}
