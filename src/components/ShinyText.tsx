import React, { FC, CSSProperties } from "react";

interface ShinyTextProps {
  text: string; // The text to be displayed
  disabled?: boolean; // Disable the shine animation
  speed?: number; // Animation speed in seconds
  className?: string; // Additional custom class names
}

const ShinyText: FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  const style: CSSProperties = {
    backgroundImage:
      "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    animationDuration,
  };

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={style}
    >
      {text}
    </div>
  );
};

export default ShinyText;
