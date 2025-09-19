import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FormInput from '../components/forms/FormInput';
import FormButton from '../components/forms/FormButton';
import noteService from '../services/noteService';

const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [tags, setTags] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            setError('Please select at least one file to upload.');
            return;
        }
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('course_code', courseCode);
        formData.append('course_name', courseName);
        formData.append('visibility', visibility);
        formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const data = await noteService.createNote(formData);
            navigate(`/notes/${data.note.id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload note.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Upload New Note" />
            <div className="max-w-4xl mx-auto bg-pixel-white border-4 border-pixel-black p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput id="title" label="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <FormInput id="courseCode" label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput id="courseName" label="Course Name (Optional)" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                        <div>
                            <label htmlFor="visibility" className="block text-pixel-black text-lg mb-2">Visibility</label>
                            <select id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-full px-4 py-3 bg-pixel-white border-2 border-pixel-black shadow-pixel-sm focus:outline-none focus:ring-2 focus:ring-pixel-blue">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <FormInput id="tags" label="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. calculus, exam" />
                    </div>

                    <div>
                        <label className="block text-pixel-black text-lg mb-2">Files</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-4 border-dashed border-pixel-black">
                            <div className="space-y-1 text-center">
                                <span className="text-6xl">📤</span>
                                <div className="flex text-lg text-pixel-black">
                                    <label htmlFor="file-upload" className="relative cursor-pointer font-mono text-pixel-blue hover:underline">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="files" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-sm text-pixel-black">PNG, JPG, PDF, DOCX up to 20MB</p>
                            </div>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div>
                            <h4 className="text-lg font-mono text-pixel-black mb-2">Selected files:</h4>
                            <ul className="space-y-2">
                                {files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between bg-pixel-purple p-2">
                                        <span className="text-lg font-mono text-pixel-black truncate">{file.name}</span>
                                        <button type="button" onClick={() => removeFile(index)} className="text-pixel-red text-2xl">
                                            ❌
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error && <p className="text-pixel-red text-lg text-center">{error}</p>}

                    <div className="text-right">
                        <FormButton isLoading={loading} type="submit" fullWidth={false}>
                            Upload Note
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UploadPage;
