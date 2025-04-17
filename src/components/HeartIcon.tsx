import { useState } from "react";
import "./HeartIcon.css"; // подключим стили отдельно

export const HeartIcon = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <svg
      onClick={handleClick}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`heart-icon ${isAnimating ? "animate" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <rect width="36" height="36" rx="10" fill="#080808" fillOpacity="0.6" />
      <path
        className="heart-path"
        d="M27 14.25C27 11.765 24.901 9.75 22.312 9.75C20.377 9.75 18.715 10.876 18 12.483C17.285 10.876 15.623 9.75 13.687 9.75C11.1 9.75 9 11.765 9 14.25C9 21.47 18 26.25 18 26.25C18 26.25 27 21.47 27 14.25Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "white" : "none"}
      />
    </svg>
  );
};
