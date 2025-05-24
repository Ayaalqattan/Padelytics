// import React, { useState, useEffect } from 'react';
// import "./UploadSection.css";
// import VideoUpload from './VideoUpload';
// import PlayerManagement from './PlayerManagement';
// import CourtSelection from './CourtSelection';
// import SectionOne from '../components/SectionOne';
// import data from'../assets/player_analysis.json'
// import axios from 'axios';

// function UploadSection() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [selectedCourt, setSelectedCourt] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisMessage, setAnalysisMessage] = useState('');

//   useEffect(() => {
//     axios.get('home/api/get_friends/')
//       .then(res => {
//         setPlayers(res.data.friends); // Connect to players for CourtLayout
//       })
//       .catch(err => {
//         console.error('Error fetching friends:', err);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!videoFile) {
//       alert('Please upload a video');
//       return;
//     }
    
//     if (players.length === 0) {
//       alert('Please add at least one player');
//       return;
//     }
    
//     if (!selectedCourt) {
//       alert('Please select a court');
//       return;
//     }
    
//     // Show loading state
//     setIsAnalyzing(true);
//     setAnalysisMessage('');

//     // Step 1: Upload video to Django backend (Cloudinary)
//     const formData = new FormData();
//     formData.append('video', videoFile);

//     try {
//       const uploadResponse = await axios.post('http://localhost:8000/home/api/upload-video/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       if (uploadResponse.data.message !== 'Success') {
//         setIsAnalyzing(false);
//         alert(`❌ Upload failed: ${uploadResponse.data.error || 'Unknown error'}`);
//         return;
//       }

//       const cloudinaryUrl = uploadResponse.data.url;

//       // Step 2: Send Cloudinary URL to FastAPI for AI processing
//       const fastapiPayload = {
//         video_url: cloudinaryUrl,
//         destination_dir: "Uploads/videos",
//         filename: "uploaded_video.mp4",
//         players: players, // Include players if needed by FastAPI
//         court: selectedCourt // Include court if needed by FastAPI
//       };

//       const fastapiResponse = await axios.post("http://35.225.232.204/input-video/", fastapiPayload, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       setIsAnalyzing(false);
//       setAnalysisMessage('✅ Analysis Successful!');
//       alert('✅ Analysis Successful!');
//       console.log('Analysis result:', fastapiResponse.data);

//     } catch (error) {
//       setIsAnalyzing(false);
//       const errorMessage = error.response?.data?.error || error.message;
//       setAnalysisMessage(`❌ Analysis failed: ${errorMessage}`);
//       alert(`❌ Analysis failed: ${errorMessage}`);
//       console.error('Error during upload or analysis:', error);
//     }
//   };

//   return (
//     <div className="upload-section">
//       <SectionOne />
//       <div className="app-container">
//         <div className="form-container">
//           <form id="analysis-form" onSubmit={handleSubmit}>
//             {/* Video Upload Section */}
//             <div className="form-section">
//               <h2>Video Upload</h2>
//               <VideoUpload 
//                 videoFile={videoFile} 
//                 setVideoFile={setVideoFile} 
//               />
//             </div>
            
//             {/* Players Section */}
//             <div className="form-section">
//               <h2>Players</h2>
//               <PlayerManagement 
//                 players={players} 
//                 setPlayers={setPlayers} 
//               />
//             </div>
            
//             {/* Court Selection Section */}
//             <div className="form-section">
//               <h2>Court Selection</h2>
//               <CourtSelection 
//                 selectedCourt={selectedCourt} 
//                 setSelectedCourt={setSelectedCourt} 
//               />
//             </div>
            
//             {/* Analysis Button */}
//             <button 
//               type="submit" 
//               className="submit-button"
//               disabled={isAnalyzing}
//             >
//               {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
//             </button>
            
//             {/* Loading Indicator */}
//             {isAnalyzing && (
//               <div className="loading">
//                 <div className="spinner"></div>
//                 <p>Analyzing video... This may take a few minutes.</p>
//               </div>
//             )}
            
//             {/* Analysis Message */}
//             {analysisMessage && (
//               <p className={`mt-4 text-center ${analysisMessage.startsWith('✅') ? 'text-green-500' : 'text-red-500'}`}>
//                 {analysisMessage}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadSection;

import React, { useState, useEffect } from 'react';
import "./UploadSection.css";
import VideoUpload from './VideoUpload';
import PlayerManagement from './PlayerManagement';
import CourtSelection from './CourtSelection';
import SectionOne from '../components/SectionOne';
import AnalysisResult from './AnalysisResult'; // ✅ ربط صفحة التحليل
import axios from 'axios';

function UploadSection() {
  const [videoFile, setVideoFile] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [analysisData, setAnalysisData] = useState(null); // ✅ حالة لحفظ بيانات التحليل

  useEffect(() => {
    axios.get('home/api/get_friends/')
      .then(res => {
        setPlayers(res.data.friends);
      })
      .catch(err => {
        console.error('Error fetching friends:', err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    setIsAnalyzing(true);
    setAnalysisMessage('');
    setAnalysisData(null);

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const uploadResponse = await axios.post('http://localhost:8000/home/api/upload-video/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (uploadResponse.data.message !== 'Success') {
        setIsAnalyzing(false);
        alert(`❌ Upload failed: ${uploadResponse.data.error || 'Unknown error'}`);
        return;
      }

      const cloudinaryUrl = uploadResponse.data.url;

      const fastapiPayload = {
        video_url: cloudinaryUrl,
        destination_dir: "Uploads/videos",
        filename: "uploaded_video.mp4",
        players: players,
        court: selectedCourt
      };

      const fastapiResponse = await axios.post("http://35.225.232.204/input-video/", fastapiPayload, {
        headers: { 'Content-Type': 'application/json' }
      });

      setIsAnalyzing(false);
      setAnalysisMessage('✅ Analysis Successful!');
      setAnalysisData(fastapiResponse.data); // ✅ حفظ نتائج التحليل
      alert('✅ Analysis Successful!');

    } catch (error) {
      setIsAnalyzing(false);
      const errorMessage = error.response?.data?.error || error.message;
      setAnalysisMessage(`❌ Analysis failed: ${errorMessage}`);
      alert(`❌ Analysis failed: ${errorMessage}`);
      console.error('Error during upload or analysis:', error);
    }
  };

  return (
    <div className="upload-section">
      <SectionOne />
      <div className="app-container">
        <div className="form-container">
          <form id="analysis-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Video Upload</h2>
              <VideoUpload 
                videoFile={videoFile} 
                setVideoFile={setVideoFile} 
              />
            </div>

            <div className="form-section">
              <h2>Players</h2>
              <PlayerManagement 
                players={players} 
                setPlayers={setPlayers} 
              />
            </div>

            <div className="form-section">
              <h2>Court Selection</h2>
              <CourtSelection 
                selectedCourt={selectedCourt} 
                setSelectedCourt={setSelectedCourt} 
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
            </button>

            {isAnalyzing && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing video... This may take a few minutes.</p>
              </div>
            )}

            {analysisMessage && (
              <p className={`mt-4 text-center ${analysisMessage.startsWith('✅') ? 'text-green-500' : 'text-red-500'}`}>
                {analysisMessage}
              </p>
            )}
          </form>

          {/* ✅ عرض نتيجة التحليل */}
          {analysisData && (
            <div className="form-section">
              <h2>Analysis Result</h2>
              <AnalysisResult data={analysisData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadSection;
