import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const ProfilePage = () => {
    const { user, loading: authLoading } = useAuth();

    const [fullName, setFullName] = useState('');
    const [university, setUniversity] = useState('');
    const [matricNumber, setMatricNumber] = useState('');
    const [theme, setTheme] = useState('light');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFullName(user.full_name || '');
            setUniversity(user.university || '');
            setMatricNumber(user.matric_number || '');
            setTheme(user.theme_preference || 'light');
        }
    }, [user]);

    useEffect(() => {
        // For simplicity in this redesign, theme switching will be cosmetic only
        // and won't be saved to the backend.
    }, [theme]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await userService.updateUserProfile({
                full_name: fullName,
                university,
                matric_number: matricNumber,
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="font-mono text-lg">Loading...</div>;

    return (
        <>
            <Header title="My Profile" />
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Avatar */}
                <div className="md:col-span-1">
                     <div className="bg-pixel-white p-6 border-4 border-pixel-black text-center">
                        <img
                            src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${user?.full_name}&size=128`}
                            alt="User Avatar"
                            className="w-32 h-32 mx-auto mb-4 border-4 border-pixel-black"
                        />
                        <h2 className="text-2xl">{user?.full_name}</h2>
                        <p className="font-mono text-lg text-pixel-blue">{user?.email}</p>
                    </div>
                </div>

                {/* Right Column: Forms */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-pixel-white p-8 border-4 border-pixel-black">
                        <h3 className="text-2xl mb-6">Profile Information</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <FormInput id="fullName" label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                            <FormInput id="university" label="University" value={university} onChange={e => setUniversity(e.target.value)} />
                            <FormInput id="matricNumber" label="Matric Number" value={matricNumber} onChange={e => setMatricNumber(e.target.value)} />
                            <div className="text-right">
                                <FormButton isLoading={loading} type="submit" fullWidth={false}>Save Changes</FormButton>
                            </div>
                        </form>
                    </div>

                    <div className="bg-pixel-white p-8 border-4 border-pixel-black">
                         <h3 className="text-2xl mb-6">Theme Preference</h3>
                         <div className="flex space-x-4">
                            <button onClick={() => setTheme('light')} className={`px-6 py-2 font-mono text-lg border-2 border-pixel-black shadow-pixel-sm ${theme === 'light' ? 'bg-pixel-blue text-white' : 'bg-pixel-purple'}`}>
                                Light
                            </button>
                            <button onClick={() => setTheme('dark')} className={`px-6 py-2 font-mono text-lg border-2 border-pixel-black shadow-pixel-sm ${theme === 'dark' ? 'bg-pixel-blue text-white' : 'bg-pixel-purple'}`}>
                                Dark
                            </button>
                         </div>
                         <p className="font-mono text-sm mt-4">Note: Dark mode is a visual-only toggle for this redesign.</p>
                    </div>

                    {message && <p className="text-center text-pixel-green font-mono text-lg">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
