import { useState } from 'react';
import "./UploadSection.css"
import VideoUpload from './VideoUpload';
import PlayerManagement from './PlayerManagement';
import CourtSelection from './CourtSelection';

function UploadSection() {
  const [videoFile, setVideoFile] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!videoFile) {
      alert('Please upload a video');
      return;
    }
    
    if (players.length === 0) {
      alert('Please add at least one player');
      return;
    }
    
    if (!selectedCourt) {
      alert('Please select a court');
      return;
    }
    
    // Show loading state
    setIsAnalyzing(true);
    
    // Prepare data to send to API
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('players', JSON.stringify(players));
    formData.append('court', selectedCourt);

    try {
      const response = await fetch('https://your-api-endpoint.com/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      if (response.ok) {
        // Success case
        setIsAnalyzing(false);
        alert('✅ Analysis Successful!');
        // Display results (data returned from the API)
        console.log('Analysis result:', data);
      } else {
        // Rejected case (error)
        setIsAnalyzing(false);
        alert(`❌ Analysis failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      // Handle network or other errors
      setIsAnalyzing(false);
      alert(`🚨 Server Error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <form id="analysis-form" onSubmit={handleSubmit}>
          {/* Video Upload Section */}
          <div className="form-section">
            <h2>Video Upload</h2>
            <VideoUpload 
              videoFile={videoFile} 
              setVideoFile={setVideoFile} 
            />
          </div>
          
          {/* Players Section */}
          <div className="form-section">
            <h2>Players</h2>
            <PlayerManagement 
              players={players} 
              setPlayers={setPlayers} 
            />
          </div>
          
          {/* Court Selection Section */}
          <div className="form-section">
            <h2>Court Selection</h2>
            <CourtSelection 
              selectedCourt={selectedCourt} 
              setSelectedCourt={setSelectedCourt} 
            />
          </div>
          
          {/* Analysis Button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
          </button>
          
          {/* Loading Indicator */}
          {isAnalyzing && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing video... This may take a few minutes.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UploadSection;
