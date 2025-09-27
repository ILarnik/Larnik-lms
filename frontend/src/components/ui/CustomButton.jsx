import React from "react";

const CustomButton = ({ label,children, onClick, className = "", ...props }) => {

     const content = children ?? label ?? "Button";
return (
  <>
    <style>{`
      .ref-btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.65rem 1.25rem;
        border-radius: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        border: none;
        cursor: pointer;
        color: #fff; /* White text */
        background: linear-gradient(to right, #16a34a, #059669); /* Green gradient */
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        transition: transform 150ms ease, box-shadow 150ms ease;
      }

      .ref-btn:active {
        transform: translateY(1px);
      }

      /* Shine effect */
      .ref-btn .shine {
        position: absolute;
        top: -80%;
        left: -40%;
        width: 65%;
        height: 220%;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.6),
          rgba(255, 255, 255, 0)
        );
        transform: rotate(10deg) translateX(0);
        transition: transform 800ms cubic-bezier(.2,.9,.2,1), opacity 550ms ease;
        opacity: 0;
        pointer-events: none;
        mix-blend-mode: screen;
      }

      .ref-btn:hover .shine {
        transform: rotate(25deg) translateX(220%);
        opacity: 1;
      }

      .ref-btn:hover {
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
      }

      /* Disabled */
      .ref-btn[disabled] {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
      }
    `}</style>

    <button
      onClick={onClick}
      className={`ref-btn ${className}`}
      disabled={props.disabled}
      {...props}
    >
      {/* Shine animation layer */}
      <span className="shine" aria-hidden="true" />

      {/* Button label */}
      <span style={{ position: "relative", zIndex: 2 }}>{content}</span>
    </button>
  </>
);

};

export default CustomButton;
