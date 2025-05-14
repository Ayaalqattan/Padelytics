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

import { useEffect, useState } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your Django API endpoint
        const response = await fetch('http://localhost:8000/api/user-profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include authentication token if required (e.g., JWT)
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth method
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !userData) {
    return <div className="flex justify-center items-center h-screen">{error || 'Please sign in to view your profile.'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Player Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={userData.profile_picture || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
          {/* Performance Stats and Rewards */}
          <div className="md:col-span-2 space-y-6">
            {/* Performance Stats */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Wins</p>
                  <p className="text-xl font-bold text-green-600">{userData.stats?.wins || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Losses</p>
                  <p className="text-xl font-bold text-red-600">{userData.stats?.losses || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Rank</p>
                  <p className="text-xl font-bold text-blue-600">{userData.stats?.rank || 'Unranked'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Confidence</p>
                  <p className="text-xl font-bold text-purple-600">{userData.stats?.confidence || 0}%</p>
                </div>
              </div>
            </div>
            {/* Rewards Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards & Achievements</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Rewards</p>
                  <p className="text-lg font-medium text-gray-900">
                    {userData.rewards?.items?.length > 0 ? userData.rewards.items.join(', ') : 'No rewards yet'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Governance</p>
                  <p className="text-lg font-medium text-gray-900">
                    {userData.rewards?.governance || 'No governance roles'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;