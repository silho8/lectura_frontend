import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navLinkClasses = ({ isActive }) =>
    `flex items-center justify-center md:justify-start px-4 py-3 text-pixel-black hover:bg-pixel-purple
    ${isActive ? 'bg-pixel-light-blue text-pixel-white' : ''}`;

  return (
    <aside className="fixed bottom-0 left-0 z-20 w-full bg-pixel-white border-t-4 border-pixel-black md:relative md:w-64 md:h-screen md:border-r-4 md:border-t-0">
      <div className="hidden md:flex items-center justify-center p-6 border-b-4 border-pixel-black">
        <h1 className="text-2xl text-pixel-black">Lectura</h1>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden">
        <ul className="flex justify-around items-center h-16">
          <li><NavLink to="/dashboard" className={navLinkClasses}><span className="text-2xl">🏠</span></NavLink></li>
          <li><NavLink to="/notes" className={navLinkClasses}><span className="text-2xl">📝</span></NavLink></li>
          <li><NavLink to="/cgpa" className={navLinkClasses}><span className="text-2xl">🧮</span></NavLink></li>
          <li><NavLink to="/profile" className={navLinkClasses}><span className="text-2xl">👤</span></NavLink></li>
        </ul>
      </nav>

      {/* Desktop sidebar nav */}
      <nav className="hidden md:block p-4">
        <ul className="space-y-2">
          <li><NavLink to="/dashboard" className={navLinkClasses}><span className="mr-3 text-2xl">🏠</span><span>Dashboard</span></NavLink></li>
          <li><NavLink to="/notes" className={navLinkClasses}><span className="mr-3 text-2xl">📝</span><span>Notes</span></NavLink></li>
          <li><NavLink to="/cgpa" className={navLinkClasses}><span className="mr-3 text-2xl">🧮</span><span>CGPA Calc</span></NavLink></li>
          <li><NavLink to="/profile" className={navLinkClasses}><span className="mr-3 text-2xl">👤</span><span>Profile</span></NavLink></li>
          {user?.role === 'admin' && (
            <li><NavLink to="/admin" className={navLinkClasses}><span className="mr-3 text-2xl">🛡️</span><span>Admin</span></NavLink></li>
          )}
        </ul>
        <div className="absolute bottom-0 left-0 w-full p-4">
           <button onClick={logout} className={`${navLinkClasses({isActive: false})} w-full !text-pixel-red hover:!bg-pixel-red hover:!text-pixel-white`}>
              <span className="mr-3 text-2xl">🚪</span>
              <span>Logout</span>
            </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
