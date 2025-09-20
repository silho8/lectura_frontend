import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-pixel-white border-b-4 border-pixel-black mb-8">
      <h1 className="text-3xl text-pixel-black">{title}</h1>
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${user?.full_name}`}
          alt="User Avatar"
          className="w-12 h-12 border-2 border-pixel-black"
        />
        <div className="ml-4 hidden md:block">
          <p className="font-mono text-lg text-pixel-black">{user?.full_name}</p>
          <p className="font-mono text-sm text-pixel-blue">{user?.role}</p>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
    title: "Dashboard",
}

export default Header;
