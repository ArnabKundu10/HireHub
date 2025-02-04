// src/components/FormInput.jsx
import React from 'react';

export default function FormInput({ type, placeholder,name,value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="w-full p-2 mb-2 bg-gray-500 border-gray-500 rounded"
    />
  );
}
