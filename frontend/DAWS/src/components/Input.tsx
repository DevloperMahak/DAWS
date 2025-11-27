import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <div className="w-full mb-4">
      <label className="text-sm font-medium text-[var(--text)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full px-4 py-2 mt-1 
          rounded-lg border border-gray-300 dark:border-gray-700
          bg-[var(--input-bg)] text-[var(--text)]
          focus:outline-none focus:ring-2
          focus:ring-[#8441A4]/60
          transition
        "
      />
    </div>
  );
}
