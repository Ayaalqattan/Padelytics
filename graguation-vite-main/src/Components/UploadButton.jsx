import React from 'react';
import { Link } from 'react-router-dom';
import './UploadButton.css';

const UploadButton = ({ url = "/UploadSection", text = "Upload to Padelytics" }) => {
  return (
    <div className="upload-button-container">
      <Link to={url} className="upload-btn">
        <span className="upload-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        </span>
        {text}
      </Link>
    </div>
  );
};

export default UploadButton;