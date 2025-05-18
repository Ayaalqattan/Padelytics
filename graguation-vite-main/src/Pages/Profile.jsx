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



// import React, { useEffect, useState } from 'react';
// import './Profile.css';
// // دالة مساعدة لجلب CSRF Token من الكوكيز
// function getCSRFToken() {
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('csrftoken='));
//   return cookieValue ? cookieValue.split('=')[1] : null;
// }
// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendEmail, setFriendEmail] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [friendError, setFriendError] = useState(null);
//   const [friendSuccess, setFriendSuccess] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     // أولاً: جلب CSRF token من السيرفر (عشان السيرفر يرسل كوكيز csrftoken)
//     fetch('http://localhost:8000/api/csrf/', {
//       credentials: 'include',
//     }).then(() => {
//       // طباعة قيمة CSRF Token من الكوكيز
//       console.log('CSRF Token from cookies:', getCSRFToken());

//       // بعد ما جلبنا الـ CSRF، نجيب بيانات المستخدم
//       fetch('http://localhost:8000/home/profile/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization header محذوف هنا
//         },
//         credentials: 'include'
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           setUserData(data);
//           setFriends(data.friends || []);
//         })
//         .catch(err => {
//           setError(err.message);
//           console.error('Error fetching user data:', err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }).catch(err => {
//       console.error('Error fetching CSRF token:', err);
//       setLoading(false);
//       setError('Failed to get CSRF token');
//     });
//   }, []);

//   // دالة رفع الصورة مع CSRF token في الهيدر
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('profile_picture', file);

//     setUploading(true);
//     try {
//       const response = await fetch('http://localhost:8000/home/profile/picture/', {
//         method: 'POST',
//         headers: {
//           // Authorization header محذوف هنا
//           'X-CSRFToken': getCSRFToken(),  // هيدر CSRFToken هنا
//           // ملاحظ: ما نحطش 'Content-Type' مع FormData لأنه بيتحدد تلقائياً
//         },
//         body: formData,
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload profile picture');
//       }

//       const data = await response.json();
//       setUserData(prev => ({ ...prev, profile_picture: data.profile_picture }));
//     } catch (err) {
//       alert(err.message);
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleAddFriend = async (e) => {
//     e.preventDefault();
//     setFriendError(null);
//     setFriendSuccess(null);

//     try {
//       const response = await fetch('http://localhost:8000/api/add-friend/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization header محذوف هنا
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

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:8000/logout/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       localStorage.removeItem('token');
//       window.location.href = '/';
//     }
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const getLevelProgress = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner': return 25;
//       case 'intermediate': return 50;
//       case 'advanced': return 75;
//       case 'pro':
//       case 'professional': return 95;
//       default: return 25;
//     }
//   };

//   const getLevelClass = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner': return 'level-beginner';
//       case 'intermediate': return 'level-intermediate';
//       case 'advanced': return 'level-advanced';
//       case 'pro':
//       case 'professional': return 'level-pro';
//       default: return 'level-beginner';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   if (error || !userData) {
//     return (
//       <div className="error-container">
//         <h3 className="error-title">Error loading profile</h3>
//         <p className="error-message">{error || 'Please sign in to view your profile.'}</p>
//         <button onClick={() => window.location.reload()} className="btn btn-primary">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   const winRate = userData.stats?.matches > 0
//     ? Math.round((userData.stats.wins / userData.stats.matches) * 100)
//     : 0;

//   return (
//     <div className="profile-container">
//       <div className="container mx-auto px-4">
//         <div className="profile-header">
//           <h1 className="profile-title">Player Profile</h1>
//           <div className="btn-group">
//             <button onClick={toggleEditMode} className="btn btn-primary">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//               </svg>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </button>
//             <button onClick={handleLogout} className="btn btn-danger">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
//                 <path d="M3 8a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1z" />
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="md:col-span-1">
//             <div className="profile-card">
//               <div className="profile-banner">
//                 <div className="profile-picture-container">
//                   <img
//                     src={userData.profile_picture || 'https://via.placeholder.com/150'}
//                     alt="Profile"
//                     className="profile-picture"
//                   />
//                   {/* هنا حطينا input رفع الصورة */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     disabled={uploading}
//                     style={{ marginTop: '10px' }}
//                   />
//                   {uploading && <p>Uploading...</p>}
//                 </div>
//               </div>

//               <div className="profile-info">
//                 <h2 className="profile-name">{userData.username || userData.name}</h2>
//                 <p className="profile-email">{userData.email}</p>

//                 <div className="mt-2">
//                   <span className={`level-badge ${getLevelClass(userData.level)}`}>
//                     {userData.level?.charAt(0).toUpperCase() + userData.level?.slice(1) || 'Beginner'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-2 space-y-6">
//             <div className="section-card">
//               <h3 className="section-title">Performance Stats</h3>
//               <div className="stats-grid">
//                 <div className="stat-card stat-matches">
//                   <div className="stat-number">{userData.stats?.matches || 0}</div>
//                   <div className="stat-label">Matches</div>
//                 </div>
//                 <div className="stat-card stat-wins">
//                   <div className="stat-number">{userData.stats?.wins || 0}</div>
//                   <div className="stat-label">Wins</div>
//                 </div>
//                 <div className="stat-card stat-losses">
//                   <div className="stat-number">{userData.stats?.losses || 0}</div>
//                   <div className="stat-label">Losses</div>
//                 </div>
//                 <div className="stat-card stat-winrate">
//                   <div className="stat-number">{winRate}%</div>
//                   <div className="stat-label">Win Rate</div>
//                 </div>
//               </div>

//               <div className="progress-bar-container">
//                 <div className="progress-bar" style={{ width: `${getLevelProgress(userData.level)}%` }}></div>
//               </div>
//             </div>

//             <div className="section-card">
//               <h3 className="section-title">Friends</h3>

//               <form onSubmit={handleAddFriend} className="add-friend-form">
//                 <input
//                   type="email"
//                   value={friendEmail}
//                   onChange={(e) => setFriendEmail(e.target.value)}
//                   placeholder="Enter friend's email"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary">Add Friend</button>
//               </form>

//               {friendError && <p className="error-message">{friendError}</p>}
//               {friendSuccess && <p className="success-message">{friendSuccess}</p>}

//               <ul className="friends-list">
//                 {friends.map(friend => (
//                   <li key={friend.id} className="friend-item">
//                     <span>{friend.username} ({friend.email})</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;



import React, { useEffect, useState } from 'react';
import './Profile.css';

// دالة مساعدة لجلب CSRF Token من الكوكيز
function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return cookieValue ? cookieValue.split('=')[1] : null;
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendUsername, setFriendUsername] = useState(''); // Changed from friendEmail to friendUsername
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friendError, setFriendError] = useState(null);
  const [friendSuccess, setFriendSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    level: 'beginner'
  });
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    // أولاً: جلب CSRF token من السيرفر (عشان السيرفر يرسل كوكيز csrftoken)
    fetch('http://localhost:8000/api/csrf/', {
      credentials: 'include',
    }).then(() => {
      // طباعة قيمة CSRF Token من الكوكيز
      console.log('CSRF Token from cookies:', getCSRFToken());

      // بعد ما جلبنا الـ CSRF، نجيب بيانات المستخدم
      fetch('http://localhost:8000/home/profile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setUserData(data);
          setFriends(data.friends || []);
          // Initialize form data with current user data
          setFormData({
            username: data.username || data.name || '',
            level: data.level || 'beginner'
          });
        })
        .catch(err => {
          setError(err.message);
          console.error('Error fetching user data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }).catch(err => {
      console.error('Error fetching CSRF token:', err);
      setLoading(false);
      setError('Failed to get CSRF token');
    });
  }, []);

  // دالة رفع الصورة مع CSRF token في الهيدر
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_picture', file);

    setUploading(true);
    try {
      const response = await fetch('http://localhost:8000/home/profile/picture/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCSRFToken(),  // هيدر CSRFToken هنا
        },
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();
      setUserData(prev => ({ ...prev, profile_picture: data.profile_picture }));
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const response = await fetch('http://localhost:8000/home/profile/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUserData(prev => ({ ...prev, ...data }));
      setUpdateSuccess('Profile updated successfully!');
      
      // Exit edit mode after successful update
      setTimeout(() => {
        setIsEditing(false);
        setUpdateSuccess(null);
      }, 2000);
    } catch (err) {
      setUpdateError(err.message);
      console.error('Error updating profile:', err);
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setFriendError(null);
    setFriendSuccess(null);

    try {
      const response = await fetch('http://localhost:8000/api/add-friend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ username: friendUsername }), // Changed from email to username
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to add friend');
      }

      const data = await response.json();
      setFriends([...friends, data.friend]);
      setFriendSuccess('Friend added successfully!');
      setFriendUsername(''); // Changed from friendEmail
    } catch (err) {
      setFriendError(err.message);
      console.error('Error adding friend:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data when canceling edit
      setFormData({
        username: userData.username || userData.name || '',
        level: userData.level || 'beginner'
      });
    }
    setIsEditing(!isEditing);
    setUpdateError(null);
    setUpdateSuccess(null);
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

  const getLevelClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'advanced': return 'level-advanced';
      case 'pro':
      case 'professional': return 'level-pro';
      default: return 'level-beginner';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="error-container">
        <h3 className="error-title">Error loading profile</h3>
        <p className="error-message">{error || 'Please sign in to view your profile.'}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  const winRate = userData.stats?.matches > 0
    ? Math.round((userData.stats.wins / userData.stats.matches) * 100)
    : 0;

  return (
    <div className="profile-container">
      <div className="container mx-auto px-4">
        <div className="profile-header">
          <h1 className="profile-title">Player Profile</h1>
          <div className="btn-group">
            <button onClick={toggleEditMode} className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                <path d="M3 8a1 1 0 011-1h4a1 1 0 010 2H4a1 1 0 01-1-1z" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="profile-card">
              <div className="profile-banner">
                <div className="profile-picture-container">
                  <img
                    src={userData.profile_picture || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="profile-picture"
                  />
                  {/* Show file input normally or in edit mode */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    style={{ marginTop: '10px' }}
                  />
                  {uploading && <p>Uploading...</p>}
                </div>
              </div>

              <div className="profile-info">
                {isEditing ? (
                  <div className="edit-form">
                    <form onSubmit={handleUpdateProfile}>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="level">Level</label>
                        <select
                          id="level"
                          name="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="pro">Professional</option>
                        </select>
                      </div>

                      {updateError && <p className="error-message">{updateError}</p>}
                      {updateSuccess && <p className="success-message">{updateSuccess}</p>}

                      <button type="submit" className="btn btn-success mt-3">
                        Save Changes
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <h2 className="profile-name">{userData.username || userData.name}</h2>
                    <p className="profile-email">{userData.email}</p>

                    <div className="mt-2">
                      <span className={`level-badge ${getLevelClass(userData.level)}`}>
                        {userData.level?.charAt(0).toUpperCase() + userData.level?.slice(1) || 'Beginner'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="section-card">
              <h3 className="section-title">Performance Stats</h3>
              <div className="stats-grid">
                <div className="stat-card stat-matches">
                  <div className="stat-number">{userData.stats?.matches || 0}</div>
                  <div className="stat-label">Matches</div>
                </div>
                <div className="stat-card stat-wins">
                  <div className="stat-number">{userData.stats?.wins || 0}</div>
                  <div className="stat-label">Wins</div>
                </div>
                <div className="stat-card stat-losses">
                  <div className="stat-number">{userData.stats?.losses || 0}</div>
                  <div className="stat-label">Losses</div>
                </div>
                <div className="stat-card stat-winrate">
                  <div className="stat-number">{winRate}%</div>
                  <div className="stat-label">Win Rate</div>
                </div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${getLevelProgress(userData.level)}%` }}></div>
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-title">Friends</h3>

              <form onSubmit={handleAddFriend} className="add-friend-form">
                <input
                  type="text" // Changed from email to text
                  value={friendUsername} // Changed from friendEmail
                  onChange={(e) => setFriendUsername(e.target.value)} // Changed from friendEmail
                  placeholder="Enter friend's username" // Updated placeholder
                  required
                />
                <button type="submit" className="btn btn-primary">Add Friend</button>
              </form>

              {friendError && <p className="error-message">{friendError}</p>}
              {friendSuccess && <p className="success-message">{friendSuccess}</p>}

              <ul className="friends-list">
                {friends.map(friend => (
                  <li key={friend.id} className="friend-item">
                    <span>{friend.username} ({friend.email})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;