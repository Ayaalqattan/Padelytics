import { useState, useRef } from 'react';
import './VideoUpload.css';

function VideoUpload({ videoFile, setVideoFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
   
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleAreaClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div
      className={`video-upload-container ${isDragging ? 'dragging' : ''} ${videoFile ? 'has-file' : ''}`}
      onClick={handleAreaClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        style={{ display: 'none' }}
      />
      
      <div className="upload-content">
        <div className="upload-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        
        {videoFile ? (
          <p className="upload-text">Selected file: {videoFile.name}</p>
        ) : (
          <p className="upload-text">select a video to upload</p>
        )}
      </div>
    </div>
  );
}

export default VideoUpload;