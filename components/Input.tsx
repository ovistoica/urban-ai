import React from 'react';

interface InputProps {
  onChange: (v: string) => void;
  value: string;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  value,
  label,
  id,
  name,
  placeholder = 'Enter slang',
}) => {
  return (
    <div className={'w-full flex flex-col'}>
      <label
        htmlFor={id}
        className="w-full text-center text-xl font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 w-full">
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          className="block w-full rounded border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
