import React from 'react';

const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-pixel-black text-lg mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-pixel-white border-2 border-pixel-black shadow-pixel-sm focus:outline-none focus:ring-2 focus:ring-pixel-blue"
      />
    </div>
  );
};

export default FormInput;
