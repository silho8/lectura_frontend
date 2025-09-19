import React from 'react';

const FormButton = ({ children, type = 'submit', isLoading = false, fullWidth = true }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        flex justify-center items-center px-4 py-3
        text-lg font-mono text-pixel-white
        bg-pixel-blue hover:bg-pixel-light-blue
        border-2 border-pixel-black shadow-pixel
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pixel-blue
        transition-all duration-200
        active:shadow-none active:transform active:translate-x-1 active:translate-y-1
        ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? '...' : children}
    </button>
  );
};

export default FormButton;
