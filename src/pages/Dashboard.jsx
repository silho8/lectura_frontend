import React from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <Header title="Dashboard" />
            <div className="mb-8">
                <h2 className="text-2xl text-pixel-black mb-2">Welcome, {user?.full_name}!</h2>
                <p className="font-mono text-lg text-pixel-black">Here's a summary of your activities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                    icon="📝"
                    title="Notes"
                    description="Upload and share lecture notes easily."
                    to="/notes"
                />
                <DashboardCard
                    icon="🧮"
                    title="CGPA"
                    description="Track and calculate your GPA seamlessly."
                    to="/cgpa"
                />
                <DashboardCard
                    icon="👤"
                    title="Profile"
                    description="Manage your profile and preferences."
                    to="/profile"
                />
                <DashboardCard
                    icon="🚀"
                    title="Upload"
                    description="Quickly upload a new note."
                    to="/upload"
                />
            </div>
        </>
    );
};

export default Dashboard;
