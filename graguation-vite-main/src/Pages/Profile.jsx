// // src/App.jsx
// import { useState } from 'react';
// import './Profile.css';

// function App() {
//   // Sample user data - this would come from your API in a real app
//   const [userData, setUserData] = useState({
//     name: "Alex Rodriguez",
//     username: "alexpadel",
//     level: "intermediate", // "beginner", "intermediate", "professional"
//     matches: 48,
//     wins: 32,
//     losses: 16,
//     friends: [
//       { id: 1, name: "Maria S.", image: "/placeholder-1.jpg" },
//       { id: 2, name: "John D.", image: "/placeholder-2.jpg" },
//       { id: 3, name: "Carlos P.", image: "/placeholder-3.jpg" },
//       { id: 4, name: "Laura M.", image: "/placeholder-4.jpg" },
//       { id: 5, name: "David R.", image: "/placeholder-5.jpg" }
//     ]
//   });

//   // Calculate win rate
//   const winRate = Math.round((userData.wins / userData.matches) * 100) || 0;

//   // Get level progress for the bar
//   const getLevelProgress = (level) => {
//     switch(level) {
//       case "beginner": return 25;
//       case "intermediate": return 65;
//       case "professional": return 95;
//       default: return 25;
//     }
//   };

//   const handleAddFriend = () => {
//     alert("Friend request feature would be implemented here");
//   };

//   return (
//     <div className="container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-image">
//             <img src="/profile-placeholder.jpg" alt="Profile" />
//           </div>
//           <div className="profile-actions">
//             <button className="btn btn-primary">Edit Profile</button>
//           </div>
//         </div>
        
//         <div className="profile-content">
//           <h1 className="profile-name">{userData.name}</h1>
//           <div className="profile-username">@{userData.username}</div>
          
//           <span className={`badge badge-${userData.level}`}>
//             {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//           </span>
          
//           <div className="stats-container">
//             <div className="stat-box">
//               <div className="stat-title">MATCHES</div>
//               <div className="stat-value">{userData.matches}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WINS</div>
//               <div className="stat-value win">{userData.wins}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">LOSSES</div>
//               <div className="stat-value loss">{userData.losses}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WIN RATE</div>
//               <div className="stat-value">{winRate}%</div>
//             </div>
//           </div>
          
//           <div className="level-indicator">
//             <div className="level-bar">
//               <div 
//                 className="level-progress" 
//                 style={{ width: `${getLevelProgress(userData.level)}%` }}
//               ></div>
//             </div>
//             <div className="level-marks">
//               <div className="level-mark">Beginner</div>
//               <div className="level-mark">Intermediate</div>
//               <div className="level-mark">Professional</div>
//             </div>
//             <div 
//               className="level-current" 
//               style={{ left: `${getLevelProgress(userData.level)}%` }}
//             >
//               {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//             </div>
//           </div>
          
//           <div className="friends-section">
//             <div className="section-title">
//               <div>Friends <span className="friend-count">({userData.friends.length})</span></div>
//               <button className="add-friend-btn" onClick={handleAddFriend}>
//                 <i className="fas fa-user-plus"></i> Add Friend
//               </button>
//             </div>
//             <div className="friends-list">
//               {userData.friends.map(friend => (
//                 <div className="friend-item" key={friend.id}>
//                   <div className="friend-avatar">
//                     <img src={friend.image} alt={friend.name} />
//                   </div>
//                   <div className="friend-name">{friend.name}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import './Profile.css';

// function Profile() {
//   // استخدام useState لتخزين البيانات من API
//   const [userData, setUserData] = useState(null); // null في البداية، لحد ما البيانات تيجي من الـ API

//   // جلب البيانات من API باستخدام useEffect
//   useEffect(() => {
//     // هنا هنفترض ان في API بيرجع البيانات الخاصة بالمستخدم
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('https://api.example.com/user-profile'); // استخدم API حقيقي هنا
//         const data = await response.json();
        
//         setUserData(data); // تخزين البيانات في الstate
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []); // [] دي معناها ان الـ useEffect هيتنفذ مرة واحدة لما الصفحة تتعمل load

//   // لو لسه البيانات مابعدتش، هنظهر loading
//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   // حساب نسبة الفوز
//   const winRate = Math.round((userData.wins / userData.matches) * 100) || 0;

//   // دالة لتحديد مستوى التقدم
//   const getLevelProgress = (level) => {
//     switch(level) {
//       case "beginner": return 25;
//       case "intermediate": return 65;
//       case "professional": return 95;
//       default: return 25;
//     }
//   };

//   // دالة لاضافة صديق
//   const handleAddFriend = () => {
//     alert("Friend request feature would be implemented here");
//   };

//   return (
//     <div className="container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-image">
//             <img src={userData.profileImage} alt="Profile" />
//           </div>
//           <div className="profile-actions">
//             <button className="btn btn-primary">Edit Profile</button>
//           </div>
//         </div>
        
//         <div className="profile-content">
//           <h1 className="profile-name">{userData.name}</h1>
//           <div className="profile-username">@{userData.username}</div>
          
//           <span className={`badge badge-${userData.level}`}>
//             {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//           </span>
          
//           <div className="stats-container">
//             <div className="stat-box">
//               <div className="stat-title">MATCHES</div>
//               <div className="stat-value">{userData.matches}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WINS</div>
//               <div className="stat-value win">{userData.wins}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">LOSSES</div>
//               <div className="stat-value loss">{userData.losses}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WIN RATE</div>
//               <div className="stat-value">{winRate}%</div>
//             </div>
//           </div>
          
//           <div className="level-indicator">
//             <div className="level-bar">
//               <div 
//                 className="level-progress" 
//                 style={{ width: `${getLevelProgress(userData.level)}%` }}
//               ></div>
//             </div>
//             <div className="level-marks">
//               <div className="level-mark">Beginner</div>
//               <div className="level-mark">Intermediate</div>
//               <div className="level-mark">Professional</div>
//             </div>
//             <div 
//               className="level-current" 
//               style={{ left: `${getLevelProgress(userData.level)}%` }}
//             >
//               {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//             </div>
//           </div>
          
//           <div className="friends-section">
//             <div className="section-title">
//               <div>Friends <span className="friend-count">({userData.friends.length})</span></div>
//               <button className="add-friend-btn" onClick={handleAddFriend}>
//                 <i className="fas fa-user-plus"></i> Add Friend
//               </button>
//             </div>
//             <div className="friends-list">
//               {userData.friends.map(friend => (
//                 <div className="friend-item" key={friend.id}>
//                   <div className="friend-avatar">
//                     <img src={friend.image} alt={friend.name} />
//                   </div>
//                   <div className="friend-name">{friend.name}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
// import { useState, useEffect } from 'react';
// import axios from 'axios';  // استيراد axios
// import './Profile.css';

// function Profile() {
//   const [userData, setUserData] = useState(null); // null في البداية، لحد ما البيانات تيجي من الـ API
//   const [error, setError] = useState(null); // لتخزين أي خطأ في جلب البيانات

//   // جلب البيانات من API باستخدام useEffect
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // هنا سيتم إرسال طلب إلى API الخاص بك في Django لعرض بيانات المستخدم باستخدام axios
//         const response = await axios.get('http://localhost:8000/home/profile/', {
//           withCredentials: true, // هنا نضيف withCredentials مع axios لتضمين الكوكيز مع الطلب
//         });

//         setUserData(response.data); // تخزين البيانات في الـ state
//       } catch (error) {
//         setError(error.message); // تخزين الخطأ في حال حدوثه
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []); // [] تعني أن الـ useEffect سيعمل مرة واحدة فقط عند تحميل الصفحة

//   // لو لسه البيانات مابعدتش، هنظهر loading
//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   // لو في خطأ، هنظهر رسالة الخطأ
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // حساب نسبة الفوز
//   const winRate = Math.round((userData.wins / userData.matches) * 100) || 0;

//   // دالة لتحديد مستوى التقدم
//   const getLevelProgress = (level) => {
//     switch(level) {
//       case "beginner": return 25;
//       case "intermediate": return 65;
//       case "professional": return 95;
//       default: return 25;
//     }
//   };

//   // دالة لاضافة صديق
//   const handleAddFriend = () => {
//     alert("Friend request feature would be implemented here");
//   };

//   return (
//     <div className="container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-image">
//             <img src={userData.profileImage} alt="Profile" />
//           </div>
//           <div className="profile-actions">
//             <button className="btn btn-primary">Edit Profile</button>
//           </div>
//         </div>
        
//         <div className="profile-content">
//           <h1 className="profile-name">{userData.name}</h1>
//           <div className="profile-username">@{userData.username}</div>
          
//           <span className={`badge badge-${userData.level}`}>
//             {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//           </span>
          
//           <div className="stats-container">
//             <div className="stat-box">
//               <div className="stat-title">MATCHES</div>
//               <div className="stat-value">{userData.matches}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WINS</div>
//               <div className="stat-value win">{userData.wins}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">LOSSES</div>
//               <div className="stat-value loss">{userData.losses}</div>
//             </div>
//             <div className="stat-box">
//               <div className="stat-title">WIN RATE</div>
//               <div className="stat-value">{winRate}%</div>
//             </div>
//           </div>
          
//           <div className="level-indicator">
//             <div className="level-bar">
//               <div 
//                 className="level-progress" 
//                 style={{ width: `${getLevelProgress(userData.level)}%` }}
//               ></div>
//             </div>
//             <div className="level-marks">
//               <div className="level-mark">Beginner</div>
//               <div className="level-mark">Intermediate</div>
//               <div className="level-mark">Professional</div>
//             </div>
//             <div 
//               className="level-current" 
//               style={{ left: `${getLevelProgress(userData.level)}%` }}
//             >
//               {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
//             </div>
//           </div>
          
//           <div className="friends-section">
//             <div className="section-title">
//               <div>Friends <span className="friend-count">({userData.friends.length})</span></div>
//               <button className="add-friend-btn" onClick={handleAddFriend}>
//                 <i className="fas fa-user-plus"></i> Add Friend
//               </button>
//             </div>
//             <div className="friends-list">
//               {userData.friends.map(friend => (
//                 <div className="friend-item" key={friend.id}>
//                   <div className="friend-avatar">
//                     <img src={friend.image} alt={friend.name} />
//                   </div>
//                   <div className="friend-name">{friend.name}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        
        // For debugging: check if the request is being made
        const response = await axios.get('http://localhost:8000/home/profile/', {
          withCredentials: true,
        });
        
        console.log('Response received:', response);
        
        setUserData(response.data);
        setLoading(false); // Set loading to false once data is received
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        // More detailed error logging
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          setError(`Server error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          setError("No response from server. Is the backend running?");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Request error: ${error.message}`);
        }
        
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchUserData();
  }, []);

  // Show loading state
  if (loading) {
    return <div className="loading-container">Loading user data...</div>;
  }

  // Show error if any
  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading profile</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // For testing: If the real API isn't working, use this mock data
  if (!userData) {
    // Mock data for testing UI when API is not available
    const mockUserData = {
      name: "Test User",
      username: "testuser",
      profileImage: "/api/placeholder/150/150",
      level: "intermediate",
      matches: 56,
      wins: 32,
      losses: 24,
      friends: [
        { id: 1, name: "Friend 1", image: "/api/placeholder/50/50" },
        { id: 2, name: "Friend 2", image: "/api/placeholder/50/50" }
      ]
    };
    
    setUserData(mockUserData);
    return <div>Loading with mock data...</div>;
  }

  // Calculate win rate
  const winRate = Math.round((userData.wins / userData.matches) * 100) || 0;

  // Level progress determination function
  const getLevelProgress = (level) => {
    switch(level) {
      case "beginner": return 25;
      case "intermediate": return 65;
      case "professional": return 95;
      default: return 25;
    }
  };

  // Handle adding friend
  const handleAddFriend = () => {
    alert("Friend request feature would be implemented here");
  };

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <img src={userData.profileImage || "/api/placeholder/150/150"} alt="Profile" />
          </div>
          <div className="profile-actions">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
        
        <div className="profile-content">
          <h1 className="profile-name">{userData.name}</h1>
          <div className="profile-username">@{userData.username}</div>
          
          <span className={`badge badge-${userData.level}`}>
            {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
          </span>
          
          <div className="stats-container">
            <div className="stat-box">
              <div className="stat-title">MATCHES</div>
              <div className="stat-value">{userData.matches}</div>
            </div>
            <div className="stat-box">
              <div className="stat-title">WINS</div>
              <div className="stat-value win">{userData.wins}</div>
            </div>
            <div className="stat-box">
              <div className="stat-title">LOSSES</div>
              <div className="stat-value loss">{userData.losses}</div>
            </div>
            <div className="stat-box">
              <div className="stat-title">WIN RATE</div>
              <div className="stat-value">{winRate}%</div>
            </div>
          </div>
          
          <div className="level-indicator">
            <div className="level-bar">
              <div 
                className="level-progress" 
                style={{ width: `${getLevelProgress(userData.level)}%` }}
              ></div>
            </div>
            <div className="level-marks">
              <div className="level-mark">Beginner</div>
              <div className="level-mark">Intermediate</div>
              <div className="level-mark">Professional</div>
            </div>
            <div 
              className="level-current" 
              style={{ left: `${getLevelProgress(userData.level)}%` }}
            >
              {userData.level.charAt(0).toUpperCase() + userData.level.slice(1)}
            </div>
          </div>
          
          <div className="friends-section">
            <div className="section-title">
              <div>Friends <span className="friend-count">({userData.friends?.length || 0})</span></div>
              <button className="add-friend-btn" onClick={handleAddFriend}>
                <i className="fas fa-user-plus"></i> Add Friend
              </button>
            </div>
            <div className="friends-list">
              {userData.friends?.map(friend => (
                <div className="friend-item" key={friend.id}>
                  <div className="friend-avatar">
                    <img src={friend.image || "/api/placeholder/50/50"} alt={friend.name} />
                  </div>
                  <div className="friend-name">{friend.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;