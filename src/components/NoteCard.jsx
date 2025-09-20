import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
  const fileCount = note.files?.length || 0;

  const getFileTypeLabel = () => {
    if (fileCount === 0) return 'No files';
    if (fileCount === 1) return '1 file';
    return `${fileCount} files`;
  };

  return (
    <Link to={`/notes/${note.id}`} className="block bg-pixel-white border-4 border-pixel-black p-4 hover:bg-pixel-purple transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl text-pixel-black truncate">{note.title}</h3>
        <span className="text-sm font-mono text-pixel-white bg-pixel-blue px-2 py-1">
            {note.course_code}
        </span>
      </div>

      <div className="font-mono text-pixel-black space-y-2 text-lg">
        <div className="flex items-center">
            <span className="mr-2">👤</span>
            <span>{note.uploader?.full_name || 'Unknown'}</span>
        </div>
        <div className="flex items-center">
            <span className="mr-2">👁️</span>
            <span className="capitalize">{note.visibility}</span>
        </div>
        <div className="flex items-center">
            <span className="mr-2">📁</span>
            <span>{getFileTypeLabel()}</span>
        </div>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex items-center flex-wrap pt-3 mt-3 border-t-2 border-pixel-black">
            {note.tags.map(tag => (
                <span key={tag} className="text-xs font-mono bg-pixel-light-blue text-pixel-white px-2 py-1 mr-1 mb-1">{tag}</span>
            ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t-2 border-pixel-black flex items-center justify-between">
        <p className="text-sm font-mono text-pixel-black">
            {new Date(note.created_at).toLocaleDateString()}
        </p>
        <div className="text-lg font-mono text-pixel-blue hover:underline">
            View Details
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
