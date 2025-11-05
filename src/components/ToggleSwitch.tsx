// components/ToggleSwitch.tsx
"use client";

type ToggleSwitchProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={id}
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-300 shadow-inner shadow-gray-400/50 after:shadow-md"></div>
      </label>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
