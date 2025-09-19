import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ icon, title, description, to }) => {
    return (
        <Link to={to} className="block bg-pixel-white border-4 border-pixel-black p-6 hover:bg-pixel-purple transition-colors duration-200">
            <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{icon}</span>
                <h3 className="text-2xl text-pixel-black">{title}</h3>
            </div>
            <p className="font-mono text-lg text-pixel-black">{description}</p>
        </Link>
    );
};

export default DashboardCard;
