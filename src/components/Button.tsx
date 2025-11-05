import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 rounded-lg transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
