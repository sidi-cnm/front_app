import React from "react";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional additional className
};

const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  className = ""
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 
            border border-gray-300 rounded-lg 
            shadow-sm focus:outline-none 
            focus:ring-2 focus:ring-teal-400 focus:border-transparent
            transition-all duration-150 ease-in-out
            placeholder-gray-400
            hover:border-gray-400
            text-gray-700
          `}
        />
      </div>
    </div>
  );
};

export default Input;