import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import noteService from '../services/noteService';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const q = searchParams.get('q') || '';
    const visibility = searchParams.get('visibility') || 'public';

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await noteService.getNotes({ page, q, visibility });
            setNotes(data.notes);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to fetch notes. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [page, q, visibility]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value;
        setSearchParams({ q: searchTerm, page: 1, visibility });
    };

    return (
        <>
            <Header title="Notes" />
            <div className="bg-pixel-white border-4 border-pixel-black p-4 mb-8">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-grow w-full">
                        <FormInput
                            id="search"
                            label=""
                            type="text"
                            defaultValue={q}
                            placeholder="Search by title, course, or tags..."
                        />
                    </div>
                    <select
                        value={visibility}
                        onChange={(e) => setSearchParams({ q, page: 1, visibility: e.target.value })}
                        className="w-full md:w-auto px-4 py-3 bg-pixel-white border-2 border-pixel-black shadow-pixel-sm focus:outline-none focus:ring-2 focus:ring-pixel-blue"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="all">All My Notes</option>
                    </select>
                    <FormButton type="submit" fullWidth={false}>Search</FormButton>
                </form>
            </div>

            {loading && <div className="text-center font-mono text-lg">Loading notes...</div>}
            {error && <div className="text-center text-pixel-red text-lg">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => <NoteCard key={note.id} note={note} />)}
                    </div>
                    {notes.length === 0 && <p className="text-center font-mono text-lg text-pixel-black mt-8">No notes found.</p>}
                </>
            )}

            {totalPages > 1 && (
                 <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        onClick={() => setSearchParams({ q, visibility, page: page - 1 })}
                        disabled={page <= 1}
                        className="px-4 py-2 bg-pixel-blue text-pixel-white border-2 border-pixel-black shadow-pixel-sm disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 font-mono text-lg">Page {page} of {totalPages}</span>
                     <button
                        onClick={() => setSearchParams({ q, visibility, page: page + 1 })}
                        disabled={page >= totalPages}
                        className="px-4 py-2 bg-pixel-blue text-pixel-white border-2 border-pixel-black shadow-pixel-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default NotesPage;
