// File: src/components/VideoUpload.jsx
import { useState, useRef } from 'react';

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
      className={`file-upload ${isDragging ? 'dragging' : ''} ${videoFile ? 'has-file' : ''}`}
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
      {videoFile ? (
        <p>Selected file: {videoFile.name}</p>
      ) : (
        <p>Click or drag to upload video</p>
      )}
    </div>
  );
}

export default VideoUpload;