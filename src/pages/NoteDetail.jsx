import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import noteService from '../services/noteService';
import FormButton from '../components/forms/FormButton';

const NoteDetailPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [previewFile, setPreviewFile] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true);
            try {
                const data = await noteService.getNoteById(id);
                setNote(data.note);
                if (data.note.files && data.note.files.length > 0) {
                    setPreviewFile(data.note.files[0]);
                }
            } catch (err) {
                setError('Failed to fetch note details.');
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const getFileIcon = (mimetype) => {
        if (mimetype.startsWith('image/')) return '🖼️';
        if (mimetype === 'application/pdf') return '📄';
        return '📁';
    };

    if (loading) return <div className="flex h-screen items-center justify-center font-mono text-lg">Loading...</div>;
    if (error) return <div className="flex h-screen items-center justify-center text-pixel-red text-lg">{error}</div>;
    if (!note) return <div className="flex h-screen items-center justify-center font-mono text-lg">Note not found.</div>;

    return (
        <>
            <Header title="Note Details" />
            <div className="mb-6">
                <Link to="/notes" className="font-mono text-lg text-pixel-blue hover:underline mb-4 inline-block">
                    &lt;-- Back to all notes
                </Link>
                <h1 className="text-4xl text-pixel-black">{note.title}</h1>
                <p className="text-2xl text-pixel-blue font-semibold mt-1">{note.course_code}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side - Preview */}
                <div className="lg:w-2/3 bg-pixel-white border-4 border-pixel-black p-2">
                    {previewFile ? (
                        previewFile.mimetype.startsWith('image/') ? (
                            <img
                                src={noteService.getFilePreviewUrl(previewFile.id)}
                                alt="File preview"
                                className="w-full h-full max-h-[70vh] object-contain"
                            />
                        ) : previewFile.mimetype === 'application/pdf' ? (
                            <iframe
                                src={noteService.getFilePreviewUrl(previewFile.id)}
                                title="PDF Preview"
                                className="w-full h-[70vh] border-0"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[70vh] font-mono text-lg">
                                <span className="text-6xl">🚫</span>
                                <p className="mt-4">Preview not available.</p>
                                <p>Click "Download" to view the file.</p>
                            </div>
                        )
                    ) : (
                        <div className="flex items-center justify-center h-[70vh] font-mono text-lg">No files to preview.</div>
                    )}
                </div>

                {/* Right side - Files and Details */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-pixel-white border-4 border-pixel-black p-4">
                         <h3 className="text-2xl mb-4 border-b-4 border-pixel-black pb-2">Files ({note.files.length})</h3>
                         <ul className="space-y-3">
                            {note.files.map(file => (
                                <li key={file.id} className="flex items-center justify-between p-2 hover:bg-pixel-purple">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{getFileIcon(file.mimetype)}</span>
                                        <button onClick={() => setPreviewFile(file)} className="text-left hover:underline font-mono text-lg">
                                            <p>{file.filename_original}</p>
                                            <p className="text-sm">{(file.filesize_bytes / 1024 / 1024).toFixed(2)} MB</p>
                                        </button>
                                    </div>
                                    <button onClick={() => noteService.downloadFile(file.id)} className="p-2 text-2xl">
                                        💾
                                    </button>
                                </li>
                            ))}
                         </ul>
                    </div>
                    <div className="bg-pixel-white border-4 border-pixel-black p-4">
                        <h3 className="text-2xl mb-4 border-b-4 border-pixel-black pb-2">Details</h3>
                        <div className="space-y-2 font-mono text-lg">
                            <p><strong>Uploader:</strong> {note.uploader.full_name}</p>
                            <p><strong>Visibility:</strong> <span className="capitalize">{note.visibility}</span></p>
                            <p><strong>Uploaded:</strong> {new Date(note.created_at).toLocaleString()}</p>
                            {note.course_name && <p><strong>Course:</strong> {note.course_name}</p>}
                            {note.tags && note.tags.length > 0 && <p><strong>Tags:</strong> {note.tags.join(', ')}</p>}
                        </div>
                        <FormButton fullWidth={true}>Share</FormButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoteDetailPage;
