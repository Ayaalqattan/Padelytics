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

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Profile.css';

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         console.log('Fetching user data...');
        
//         // For debugging: check if the request is being made
//         const response = await axios.get('http://localhost:8000/home/profile/', {
//           withCredentials: true,
//         });
        
//         console.log('Response received:', response);
        
//         setUserData(response.data);
//         setLoading(false); // Set loading to false once data is received
//       } catch (error) {
//         console.error("Error fetching user data:", error);
        
//         // More detailed error logging
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.error("Response data:", error.response.data);
//           console.error("Response status:", error.response.status);
//           console.error("Response headers:", error.response.headers);
//           setError(`Server error: ${error.response.status}`);
//         } else if (error.request) {
//           // The request was made but no response was received
//           console.error("No response received:", error.request);
//           setError("No response from server. Is the backend running?");
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           setError(`Request error: ${error.message}`);
//         }
        
//         setLoading(false); // Set loading to false even on error
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Show loading state
//   if (loading) {
//     return <div className="loading-container">Loading user data...</div>;
//   }

//   // Show error if any
//   if (error) {
//     return (
//       <div className="error-container">
//         <h3>Error loading profile</h3>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   // For testing: If the real API isn't working, use this mock data
//   if (!userData) {
//     // Mock data for testing UI when API is not available
//     const mockUserData = {
//       name: "Test User",
//       username: "testuser",
//       profileImage: "/api/placeholder/150/150",
//       level: "intermediate",
//       matches: 56,
//       wins: 32,
//       losses: 24,
//       friends: [
//         { id: 1, name: "Friend 1", image: "/api/placeholder/50/50" },
//         { id: 2, name: "Friend 2", image: "/api/placeholder/50/50" }
//       ]
//     };
    
//     setUserData(mockUserData);
//     return <div>Loading with mock data...</div>;
//   }

//   // Calculate win rate
//   const winRate = Math.round((userData.wins / userData.matches) * 100) || 0;

//   // Level progress determination function
//   const getLevelProgress = (level) => {
//     switch(level) {
//       case "beginner": return 25;
//       case "intermediate": return 65;
//       case "professional": return 95;
//       default: return 25;
//     }
//   };

//   // Handle adding friend
//   const handleAddFriend = () => {
//     alert("Friend request feature would be implemented here");
//   };

//   return (
//     <div className="container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-image">
//             <img src={userData.profileImage || "/api/placeholder/150/150"} alt="Profile" />
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
//               <div>Friends <span className="friend-count">({userData.friends?.length || 0})</span></div>
//               <button className="add-friend-btn" onClick={handleAddFriend}>
//                 <i className="fas fa-user-plus"></i> Add Friend
//               </button>
//             </div>
//             <div className="friends-list">
//               {userData.friends?.map(friend => (
//                 <div className="friend-item" key={friend.id}>
//                   <div className="friend-avatar">
//                     <img src={friend.image || "/api/placeholder/50/50"} alt={friend.name} />
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

// import { useEffect, useState } from 'react';

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendEmail, setFriendEmail] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [friendError, setFriendError] = useState(null);
//   const [friendSuccess, setFriendSuccess] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/user-profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const data = await response.json();
//         setUserData(data);
//         setFriends(data.friends || []); // Assuming friends are included in user data
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching user data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleAddFriend = async (e) => {
//     e.preventDefault();
//     setFriendError(null);
//     setFriendSuccess(null);

//     try {
//       const response = await fetch('http://localhost:8000/api/add-friend/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ email: friendEmail })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add friend');
//       }

//       const data = await response.json();
//       setFriends([...friends, data.friend]);
//       setFriendSuccess('Friend added successfully!');
//       setFriendEmail('');
//     } catch (err) {
//       setFriendError(err.message);
//       console.error('Error adding friend:', err);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error || !userData) {
//     return <div className="flex justify-center items-center h-screen">{error || 'Please sign in to view your profile.'}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Player Profile</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* User Info */}
//           <div className="md:col-span-1">
//             <div className="bg-white shadow rounded-lg p-6">
//               <div className="flex flex-col items-center">
//                 <img
//                   src={userData.profile_picture || 'https://via.placeholder.com/150'}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full mb-4"
//                 />
//                 <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
//                 <p className="text-gray-600">{userData.email}</p>
//               </div>
//             </div>
//           </div>
//           {/* Performance Stats, Rewards, and Friends */}
//           <div className="md:col-span-2 space-y-6">
//             {/* Performance Stats */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-600">Wins</p>
//                   <p className="text-xl font-bold text-green-600">{userData.stats?.wins || 0}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Losses</p>
//                   <p className="text-xl font-bold text-red-600">{userData.stats?.losses || 0}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Rank</p>
//                   <p className="text-xl font-bold text-blue-600">{userData.stats?.rank || 'Unranked'}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Confidence</p>
//                   <p className="text-xl font-bold text-purple-600">{userData.stats?.confidence || 0}%</p>
//                 </div>
//               </div>
//             </div>
//             {/* Rewards Section */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards & Achievements</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-gray-600">Rewards</p>
//                   <p className="text-lg font-medium text-gray-900">
//                     {userData.rewards?.items?.length > 0 ? userData.rewards.items.join(', ') : 'No rewards yet'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Governance</p>
//                   <p className="text-lg font-medium text-gray-900">
//                     {userData.rewards?.governance || 'No governance roles'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Friends Section */}
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Friends</h3>
//               <form onSubmit={handleAddFriend} className="mb-4">
//                 <div className="flex gap-2">
//                   <input
//                     type="email"
//                     value={friendEmail}
//                     onChange={(e) => setFriendEmail(e.target.value)}
//                     placeholder="Enter friend's email"
//                     className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     Add Friend
//                   </button>
//                 </div>
//                 {friendError && <p className="mt-2 text-red-600">{friendError}</p>}
//                 {friendSuccess && <p className="mt-2 text-green-600">{friendSuccess}</p>}
//               </form>
//               <div className="space-y-2">
//                 {friends.length > 0 ? (
//                   friends.map((friend) => (
//                     <div
//                       key={friend.id}
//                       className="flex items-center p-2 bg-gray-50 rounded-lg"
//                     >
//                       <img
//                         src={friend.profile_picture || 'https://via.placeholder.com/40'}
//                         alt={friend.name}
//                         className="w-10 h-10 rounded-full mr-3"
//                       />
//                       <p className="text-gray-900">{friend.name}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No friends yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendEmail, setFriendEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friendError, setFriendError] = useState(null);
  const [friendSuccess, setFriendSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/home/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setFriends(data.friends || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setFriendError(null);
    setFriendSuccess(null);

    try {
      const response = await fetch('http://localhost:8000/api/add-friend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email: friendEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to add friend');
      }

      const data = await response.json();
      setFriends([...friends, data.friend]);
      setFriendSuccess('Friend added successfully!');
      setFriendEmail('');
    } catch (err) {
      setFriendError(err.message);
      console.error('Error adding friend:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const getLevelProgress = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'pro':
      case 'professional': return 95;
      default: return 25;
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'pro':
      case 'professional': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h3 className="text-red-600 text-xl font-semibold">Error loading profile</h3>
        <p className="text-gray-700 mt-2">{error || 'Please sign in to view your profile.'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const winRate = userData.stats?.matches > 0 
    ? Math.round((userData.stats.wins / userData.stats.matches) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Player Profile</h1> */}
          <div className="flex space-x-3">
            <button 
              onClick={toggleEditMode}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                <path d="M3 8a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1z" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="absolute -bottom-12 inset-x-0 flex justify-center">
                  <div className="ring-4 ring-white rounded-full">
                    <img
                      src={userData.profile_picture || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-6 px-6">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-gray-900">{userData.username || userData.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
                  
                  <div className="mt-3 flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeColor(userData.level)}`}>
                      {userData.level?.charAt(0).toUpperCase() + userData.level?.slice(1) || 'Beginner'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Performance Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-500 font-medium">Matches</p>
                  <p className="text-2xl font-bold text-blue-700">{userData.stats?.matches || 0}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-500 font-medium">Wins</p>
                  <p className="text-2xl font-bold text-green-700">{userData.stats?.wins || 0}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-500 font-medium">Losses</p>
                  <p className="text-2xl font-bold text-red-700">{userData.stats?.losses || 0}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-500 font-medium">Win Rate</p>
                  <p className="text-2xl font-bold text-purple-700">{winRate}%</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700 font-medium mb-2">Level Progress</p>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500" 
                    style={{ width: `${getLevelProgress(userData.level)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Pro</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Rewards & Achievements</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 font-medium">Rewards</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userData.rewards?.items?.length > 0 ? (
                      userData.rewards.items.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No rewards yet</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Friends</h3>
              <form onSubmit={handleAddFriend} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="Enter friend's email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Add Friend
                  </button>
                </div>
                {friendError && <p className="mt-2 text-red-600 text-sm">{friendError}</p>}
                {friendSuccess && <p className="mt-2 text-green-600 text-sm">{friendSuccess}</p>}
              </form>
              
              <div className="space-y-3">
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <img
                        src={friend.profile_picture || 'https://via.placeholder.com/40'}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">{friend.name}</p>
                        {friend.level && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelBadgeColor(friend.level)}`}>
                            {friend.level}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No friends yet</p>
                    <p className="text-sm text-gray-400 mt-1">Add friends using their email address</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;