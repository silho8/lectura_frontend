import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import adminService from '../services/adminService';
import FormButton from '../components/forms/FormButton';

const AdminDashboardPage = () => {
    const [view, setView] = useState('users'); // 'users' or 'notes'
    const [users, setUsers] = useState([]);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (view === 'users') {
                    const data = await adminService.listUsers();
                    setUsers(data.users);
                } else {
                    const data = await adminService.listAllNotes();
                    setNotes(data.notes);
                }
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [view]);

    const handleBanUser = async (userId) => {
        if(window.confirm('Are you sure you want to change this user\'s status?')) {
            await adminService.banUser(userId);
            const data = await adminService.listUsers(); // Refresh
            setUsers(data.users);
        }
    };

    const handleDeleteNote = async (noteId) => {
         if(window.confirm('Are you sure you want to delete this note permanently?')) {
            await adminService.deleteNoteAsAdmin(noteId);
            const data = await adminService.listAllNotes(); // Refresh
            setNotes(data.notes);
        }
    };

    return (
        <>
            <Header title="Admin Dashboard" />
            <div className="bg-pixel-white p-4 border-4 border-pixel-black">
                <div className="border-b-4 border-pixel-black mb-4">
                    <nav className="flex space-x-4">
                        <button onClick={() => setView('users')} className={`py-2 px-4 font-mono text-lg ${view === 'users' ? 'bg-pixel-blue text-pixel-white' : 'text-pixel-black'}`}>
                            Manage Users
                        </button>
                        <button onClick={() => setView('notes')} className={`py-2 px-4 font-mono text-lg ${view === 'notes' ? 'bg-pixel-blue text-pixel-white' : 'text-pixel-black'}`}>
                            Manage Notes
                        </button>
                    </nav>
                </div>

                {loading && <p className="font-mono text-lg">Loading...</p>}

                <div className="overflow-x-auto">
                    {view === 'users' && (
                        <table className="w-full text-left font-mono text-lg">
                            <thead><tr className="border-b-4 border-pixel-black"><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b-2 border-pixel-purple">
                                        <td className="p-2">{user.id}</td>
                                        <td className="p-2">{user.full_name}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2"><span className={`px-2 py-1 text-xs ${user.status === 'active' ? 'bg-pixel-green text-pixel-white' : 'bg-pixel-red text-pixel-white'}`}>{user.status}</span></td>
                                        <td className="p-2"><button onClick={() => handleBanUser(user.id)} className="text-pixel-red hover:underline">Toggle Ban</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {view === 'notes' && (
                        <table className="w-full text-left font-mono text-lg">
                            <thead><tr className="border-b-4 border-pixel-black"><th className="p-2">ID</th><th className="p-2">Title</th><th className="p-2">Uploader</th><th className="p-2">Visibility</th><th className="p-2">Actions</th></tr></thead>
                            <tbody>
                                {notes.map(note => (
                                    <tr key={note.id} className="border-b-2 border-pixel-purple">
                                        <td className="p-2">{note.id}</td>
                                        <td className="p-2">{note.title}</td>
                                        <td className="p-2">{note.uploader.full_name}</td>
                                        <td className="p-2">{note.visibility}</td>
                                        <td className="p-2"><button onClick={() => handleDeleteNote(note.id)} className="text-pixel-red hover:underline">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDashboardPage;
