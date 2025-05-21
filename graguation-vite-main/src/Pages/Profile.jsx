// import React, { useEffect, useState, useCallback } from 'react';
// import './Profile.css';

// // Function to retrieve CSRF token from cookies or DOM
// function getCSRFToken() {
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('csrftoken='))
//     ?.split('=')[1];
//   if (cookieValue) {
//     console.log('Found CSRF token in cookies:', cookieValue);
//     return cookieValue;
//   }
//   const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
//   if (csrfInput) {
//     console.log('Found CSRF token in DOM:', csrfInput);
//     return csrfInput;
//   }
//   console.error('CSRF token not found in cookies or DOM');
//   return null;
// }

// // Basic input sanitization to prevent XSS
// const sanitizeInput = (input) => input.replace(/[<>{}]/g, '');

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendUsername, setFriendUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({ username: '', level: 'beginner' });
//   const [csrfToken, setCsrfToken] = useState(null);

//   // Fetch CSRF token once
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         await fetch('http://localhost:8000/api/csrf/', {
//           credentials: 'include',
//           cache: 'no-store',
//         });
//         const token = getCSRFToken();
//         if (token) setCsrfToken(token);
//         else throw new Error('No CSRF token available');
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, csrf: err.message }));
//         console.error('Failed to fetch CSRF token:', err);
//       }
//     };
//     fetchCsrfToken();
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:8000/home/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           credentials: 'include',
//           signal: controller.signal,
//         });
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         const data = await response.json();
//         setUserData(data);
//         setFriends(data.friends || []);
//         setFormData({
//           username: data.username || data.name || '',
//           level: data.level || 'beginner',
//         });
//       } catch (err) {
//         if (err.name === 'AbortError') return;
//         setErrors((prev) => ({ ...prev, profile: err.message }));
//         console.error('Error fetching user data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (csrfToken) fetchData();
//     return () => controller.abort();
//   }, [csrfToken]);

//   // Handle file upload
//   const handleFileChange = useCallback(
//     async (e) => {
//       const file = e.target.files[0];
//       if (!file) return;
//       if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         setErrors((prev) => ({ ...prev, upload: 'Only JPEG, PNG, or GIF images are allowed' }));
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors((prev) => ({ ...prev, upload: 'File size must be less than 5MB' }));
//         return;
//       }

//       setUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append('profile_picture', file);
//         formData.append('csrfmiddlewaretoken', csrfToken);

//         const response = await fetch('http://localhost:8000/home/profile/picture/', {
//           method: 'POST',
//           headers: { 'X-CSRFToken': csrfToken },
//           body: formData,
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Upload failed: ${response.status} ${errorData}`);
//         }
//         const data = await response.json();
//         setUserData((prev) => ({ ...prev, profile_picture: data.profile_picture }));
//         setSuccess((prev) => ({ ...prev, upload: 'Profile picture uploaded successfully!' }));
//         setTimeout(() => setSuccess((prev) => ({ ...prev, upload: null })), 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, upload: err.message }));
//         console.error('Error uploading profile picture:', err);
//       } finally {
//         setUploading(false);
//       }
//     },
//     [csrfToken]
//   );

//   // Handle input changes
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: sanitizeInput(value),
//     }));
//   }, []);

//   // Update profile
//   const handleUpdateProfile = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setErrors((prev) => ({ ...prev, update: null }));
//       setSuccess((prev) => ({ ...prev, update: null }));

//       try {
//         if (!csrfToken) throw new Error('No CSRF token available');

//         const response = await fetch('http://localhost:8000/home/profile/update/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           body: JSON.stringify(formData),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Failed to update profile: ${response.status} ${errorData}`);
//         }

//         const data = await response.json();
//         setUserData((prev) => ({ ...prev, ...data }));
//         setSuccess((prev) => ({ ...prev, update: 'Profile updated successfully!' }));
//         setTimeout(() => {
//           setIsEditing(false);
//           setSuccess((prev) => ({ ...prev, update: null }));
//         }, 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, update: err.message }));
//         console.error('Error updating profile:', err);
//       }
//     },
//     [csrfToken, formData]
//   );

//   // Add friend
//   const handleAddFriend = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setErrors((prev) => ({ ...prev, friend: null }));
//       setSuccess((prev) => ({ ...prev, friend: null }));

//       const sanitizedUsername = sanitizeInput(friendUsername);
//       if (!sanitizedUsername) {
//         setErrors((prev) => ({ ...prev, friend: 'Invalid username' }));
//         return;
//       }

//       try {
//         if (!csrfToken) throw new Error('No CSRF token available');

//         const response = await fetch('http://localhost:8000/api/add-friend/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           body: JSON.stringify({ username: sanitizedUsername }),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Failed to add friend: ${response.status} ${errorData}`);
//         }

//         const data = await response.json();
//         setFriends((prev) => [...prev, data.friend]);
//         setSuccess((prev) => ({ ...prev, friend: 'Friend added successfully!' }));
//         setFriendUsername('');
//         setTimeout(() => setSuccess((prev) => ({ ...prev, friend: null })), 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, friend: err.message }));
//         console.error('Error adding friend:', err);
//       }
//     },
//     [csrfToken, friendUsername]
//   );

//   // Logout
//   const handleLogout = useCallback(async () => {
//     if (!window.confirm('Are you sure you want to log out?')) return;

//     try {
//       if (!csrfToken) throw new Error('No CSRF token available');

//       const response = await fetch('http://localhost:8000/logout/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': csrfToken,
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         console.error('Logout failed with status:', response.status);
//       }
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       localStorage.removeItem('token');
//       window.location.href = '/';
//     }
//   }, [csrfToken]);

//   // Toggle edit mode
//   const toggleEditMode = useCallback(() => {
//     if (isEditing) {
//       setFormData({
//         username: userData.username || userData.name || '',
//         level: userData.level || 'beginner',
//       });
//     }
//     setIsEditing((prev) => !prev);
//     setErrors((prev) => ({ ...prev, update: null }));
//     setSuccess((prev) => ({ ...prev, update: null }));
//   }, [userData]);

//   // Level progress and class
//   const getLevelProgress = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner':
//         return 25;
//       case 'intermediate':
//         return 50;
//       case 'advanced':
//         return 75;
//       case 'pro':
//       case 'professional':
//         return 95;
//       default:
//         return 25;
//     }
//   };

//   const getLevelClass = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner':
//         return 'level-beginner';
//       case 'intermediate':
//         return 'level-intermediate';
//       case 'advanced':
//         return 'level-advanced';
//       case 'pro':
//       case 'professional':
//         return 'level-pro';
//       default:
//         return 'level-beginner';
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (errors.profile || !userData) {
//     return (
//       <div className="error-container">
//         <h3 className="error-title">Error loading profile</h3>
//         <p className="error-message">{errors.profile || 'Please sign in to view your profile.'}</p>
//         <button onClick={() => window.location.reload()} className="btn btn-primary">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // Calculate win rate
//   const winRate = userData.stats?.matches > 0 ? Math.round((userData.stats.wins / userData.stats.matches) * 100) : 0;

//   return (
//     <div className="profile-container">
//       <div className="container mx-auto px-4">
//         <div className="profile-header">
//           <h1 className="profile-title">Player Profile</h1>
//           <div className="btn-group">
//             <button onClick={toggleEditMode} className="btn btn-primary">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//               </svg>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </button>
//             <button onClick={handleLogout} className="btn btn-danger">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
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
//                   <label className="file-upload-label">
//                     <span className="btn btn-sm btn-secondary">
//                       {uploading ? 'Uploading...' : 'Change Picture'}
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       disabled={uploading}
//                       className="file-input"
//                     />
//                   </label>
//                   {uploading && <div className="upload-progress-indicator">Uploading...</div>}
//                   {errors.upload && <p className="error-message">{errors.upload}</p>}
//                   {success.upload && <p className="success-message">{success.upload}</p>}
//                 </div>
//               </div>

//               <div className="profile-info">
//                 {isEditing ? (
//                   <div className="edit-form">
//                     <form onSubmit={handleUpdateProfile}>
//                       <div className="form-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                           type="text"
//                           id="username"
//                           name="username"
//                           value={formData.username}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label htmlFor="level">Level</label>
//                         <select
//                           id="level"
//                           name="level"
//                           value={formData.level}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="beginner">Beginner</option>
//                           <option value="intermediate">Intermediate</option>
//                           <option value="advanced">Advanced</option>
//                           <option value="pro">Professional</option>
//                         </select>
//                       </div>

//                       {errors.update && <p className="error-message">{errors.update}</p>}
//                       {success.update && <p className="success-message">{success.update}</p>}

//                       <button type="submit" className="btn btn-success mt-3">
//                         Save Changes
//                       </button>
//                     </form>
//                   </div>
//                 ) : (
//                   <>
//                     <h2 className="profile-name">{userData.username || userData.name}</h2>
//                     <p className="profile-email">{userData.email}</p>
//                     <div className="mt-2">
//                       <span className={`level-badge ${getLevelClass(userData.level)}`}>
//                         {userData.level?.charAt(0).toUpperCase() + userData.level?.slice(1) || 'Beginner'}
//                       </span>
//                     </div>
//                   </>
//                 )}
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
//                 <div
//                   className="progress-bar"
//                   style={{ width: `${getLevelProgress(userData.level)}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="section-card">
//               <h3 className="section-title">Friends</h3>
//               <form onSubmit={handleAddFriend} className="add-friend-form">
//                 <input
//                   type="text"
//                   value={friendUsername}
//                   onChange={(e) => setFriendUsername(sanitizeInput(e.target.value))}
//                   placeholder="Enter friend's username"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary">
//                   Add Friend
//                 </button>
//               </form>

//               {errors.friend && <p className="error-message">{errors.friend}</p>}
//               {success.friend && <p className="success-message">{success.friend}</p>}

//               <ul className="friends-list">
//                 {friends.length === 0 ? (
//                   <li className="no-friends-message">No friends added yet</li>
//                 ) : (
//                   friends.map((friend) => (
//                     <li key={friend.id || friend.username} className="friend-item">
//                       <span>
//                         {friend.username} {friend.email ? `(${friend.email})` : ''}
//                       </span>
//                     </li>
//                   ))
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;


// import React, { useEffect, useState, useCallback } from 'react';
// import './Profile.css';

// // Function to retrieve CSRF token from cookies or DOM
// function getCSRFToken() {
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('csrftoken='))
//     ?.split('=')[1];
//   if (cookieValue) {
//     console.log('Found CSRF token in cookies:', cookieValue);
//     return cookieValue;
//   }
//   const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
//   if (csrfInput) {
//     console.log('Found CSRF token in DOM:', csrfInput);
//     return csrfInput;
//   }
//   console.error('CSRF token not found in cookies or DOM');
//   return null;
// }

// // Basic input sanitization to prevent XSS
// const sanitizeInput = (input) => input.replace(/[<>{}]/g, '');

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendUsername, setFriendUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({ username: '', level: 'beginner' });
//   const [csrfToken, setCsrfToken] = useState(null);

//   // Fetch CSRF token once
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         await fetch('http://localhost:8000/api/csrf/', {
//           credentials: 'include',
//           cache: 'no-store',
//         });
//         const token = getCSRFToken();
//         if (token) setCsrfToken(token);
//         else throw new Error('No CSRF token available');
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, csrf: err.message }));
//         console.error('Failed to fetch CSRF token:', err);
//       }
//     };
//     fetchCsrfToken();
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:8000/home/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           credentials: 'include',
//           signal: controller.signal,
//         });
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         const data = await response.json();
//         setUserData(data);
//         setFriends(data.friends || []);
//         setFormData({
//           username: data.username || data.name || '',
//           level: data.level || 'beginner',
//         });
//       } catch (err) {
//         if (err.name === 'AbortError') return;
//         setErrors((prev) => ({ ...prev, profile: err.message }));
//         console.error('Error fetching user data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (csrfToken) fetchData();
//     return () => controller.abort();
//   }, [csrfToken]);

//   // Handle file upload
//   const handleFileChange = useCallback(
//     async (e) => {
//       const file = e.target.files[0];
//       if (!file) return;
//       if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         setErrors((prev) => ({ ...prev, upload: 'Only JPEG, PNG, or GIF images are allowed' }));
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors((prev) => ({ ...prev, upload: 'File size must be less than 5MB' }));
//         return;
//       }

//       setUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append('profile_picture', file);
//         formData.append('csrfmiddlewaretoken', csrfToken);

//         const response = await fetch('http://localhost:8000/home/profile/picture/', {
//           method: 'POST',
//           headers: { 'X-CSRFToken': csrfToken },
//           body: formData,
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Upload failed: ${response.status} ${errorData}`);
//         }
//         const data = await response.json();
//         setUserData((prev) => ({ ...prev, profile_picture: data.profile_picture }));
//         setSuccess((prev) => ({ ...prev, upload: 'Profile picture uploaded successfully!' }));
//         setTimeout(() => setSuccess((prev) => ({ ...prev, upload: null })), 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, upload: err.message }));
//         console.error('Error uploading profile picture:', err);
//       } finally {
//         setUploading(false);
//       }
//     },
//     [csrfToken]
//   );

//   // Handle input changes
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: sanitizeInput(value),
//     }));
//   }, []);

//   // Update profile
//   const handleUpdateProfile = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setErrors((prev) => ({ ...prev, update: null }));
//       setSuccess((prev) => ({ ...prev, update: null }));

//       try {
//         if (!csrfToken) throw new Error('No CSRF token available');

//         const response = await fetch('http://localhost:8000/home/profile/update/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           body: JSON.stringify(formData),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Failed to update profile: ${response.status} ${errorData}`);
//         }

//         const data = await response.json();
//         setUserData((prev) => ({ ...prev, ...data }));
//         setSuccess((prev) => ({ ...prev, update: 'Profile updated successfully!' }));
//         setTimeout(() => {
//           setIsEditing(false);
//           setSuccess((prev) => ({ ...prev, update: null }));
//         }, 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, update: err.message }));
//         console.error('Error updating profile:', err);
//       }
//     },
//     [csrfToken, formData]
//   );

//   // Add friend
//   const handleAddFriend = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setErrors((prev) => ({ ...prev, friend: null }));
//       setSuccess((prev) => ({ ...prev, friend: null }));

//       const sanitizedUsername = sanitizeInput(friendUsername);
//       if (!sanitizedUsername) {
//         setErrors((prev) => ({ ...prev, friend: 'Invalid username' }));
//         return;
//       }

//       try {
//         if (!csrfToken) throw new Error('No CSRF token available');

//         const response = await fetch('http://localhost:8000/api/add-friend/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//           body: JSON.stringify({ username: sanitizedUsername }),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Failed to add friend: ${response.status} ${errorData}`);
//         }

//         const data = await response.json();
//         setFriends((prev) => [...prev, data.friend]);
//         setSuccess((prev) => ({ ...prev, friend: 'Friend added successfully!' }));
//         setFriendUsername('');
//         setTimeout(() => setSuccess((prev) => ({ ...prev, friend: null })), 2000);
//       } catch (err) {
//         setErrors((prev) => ({ ...prev, friend: err.message }));
//         console.error('Error adding friend:', err);
//       }
//     },
//     [csrfToken, friendUsername]
//   );

//   // Logout
//   const handleLogout = useCallback(async () => {
//     if (!window.confirm('Are you sure you want to log out?')) return;

//     try {
//       if (!csrfToken) throw new Error('No CSRF token available');

//       const response = await fetch('http://localhost:8000/logout/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': csrfToken,
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         console.error('Logout failed with status:', response.status);
//       }
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       localStorage.removeItem('token');
//       window.location.href = '/';
//     }
//   }, [csrfToken]);

//   // Toggle edit mode
//   const toggleEditMode = useCallback(() => {
//     if (isEditing) {
//       setFormData({
//         username: userData.username || userData.name || '',
//         level: userData.level || 'beginner',
//       });
//     }
//     setIsEditing((prev) => !prev);
//     setErrors((prev) => ({ ...prev, update: null }));
//     setSuccess((prev) => ({ ...prev, update: null }));
//   }, [userData]);

//   // Get level class for styling
//   const getLevelClass = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner':
//         return 'level-beginner';
//       case 'intermediate':
//         return 'level-intermediate';
//       case 'advanced':
//         return 'level-advanced';
//       case 'pro':
//       case 'professional':
//         return 'level-pro';
//       default:
//         return 'level-beginner';
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (errors.profile || !userData) {
//     return (
//       <div className="error-container">
//         <h3 className="error-title">Error loading profile</h3>
//         <p className="error-message">{errors.profile || 'Please sign in to view your profile.'}</p>
//         <button onClick={() => window.location.reload()} className="btn btn-primary">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // Calculate win rate
//   const winRate = userData.stats?.matches > 0 ? Math.round((userData.stats.wins / userData.stats.matches) * 100) : 0;

//   return (
//     <div className="profile-container">
//       <div className="container mx-auto px-4">
//         <div className="profile-header">
//           <h1 className="profile-title">Player Profile</h1>
//           <div className="btn-group">
//             <button onClick={toggleEditMode} className="btn btn-primary">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//               </svg>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </button>
//             <button onClick={handleLogout} className="btn btn-danger">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
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
//                   <label className="file-upload-label">
//                     <span className="btn btn-sm btn-secondary">
//                       {uploading ? 'Uploading...' : 'Change Picture'}
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       disabled={uploading}
//                       className="file-input"
//                     />
//                   </label>
//                   {uploading && <div className="upload-progress-indicator">Uploading...</div>}
//                   {errors.upload && <p className="error-message">{errors.upload}</p>}
//                   {success.upload && <p className="success-message">{success.upload}</p>}
//                 </div>
//               </div>

//               <div className="profile-info">
//                 {isEditing ? (
//                   <div className="edit-form">
//                     <form onSubmit={handleUpdateProfile}>
//                       <div className="form-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                           type="text"
//                           id="username"
//                           name="username"
//                           value={formData.username}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label htmlFor="level">Level</label>
//                         <select
//                           id="level"
//                           name="level"
//                           value={formData.level}
//                           onChange={handleInputChange}
//                           className="form-control"
//                           required
//                         >
//                           <option value="beginner">Beginner</option>
//                           <option value="intermediate">Intermediate</option>
//                           <option value="advanced">Advanced</option>
//                           <option value="pro">Professional</option>
//                         </select>
//                       </div>

//                       {errors.update && <p className="error-message">{errors.update}</p>}
//                       {success.update && <p className="success-message">{success.update}</p>}

//                       <button type="submit" className="btn btn-success mt-3">
//                         Save Changes
//                       </button>
//                     </form>
//                   </div>
//                 ) : (
//                   <>
//                     <h2 className="profile-name">{userData.username || userData.name}</h2>
//                     <p className="profile-email">{userData.email}</p>
//                     <div className="mt-2">
//                       <span className={`level-badge ${getLevelClass(userData.level)}`}>
//                         {userData.level?.charAt(0).toUpperCase() + userData.level?.slice(1) || 'Beginner'}
//                       </span>
//                     </div>
//                   </>
//                 )}
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
//             </div>

//             <div className="section-card">
//               <h3 className="section-title">Friends</h3>
//               <form onSubmit={handleAddFriend} className="add-friend-form">
//                 <input
//                   type="text"
//                   value={friendUsername}
//                   onChange={(e) => setFriendUsername(sanitizeInput(e.target.value))}
//                   placeholder="Enter friend's username"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary">
//                   Add Friend
//                 </button>
//               </form>

//               {errors.friend && <p className="error-message">{errors.friend}</p>}
//               {success.friend && <p className="success-message">{success.friend}</p>}

//               <ul className="friends-list">
//                 {friends.length === 0 ? (
//                   <li className="no-friends-message">No friends added yet</li>
//                 ) : (
//                   friends.map((friend) => (
//                     <li key={friend.id || friend.username} className="friend-item">
//                       <span>
//                         {friend.username} {friend.email ? `(${friend.email})` : ''}
//                       </span>
//                     </li>
//                   ))
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState, useCallback } from 'react';
import './Profile.css';

// Function to retrieve CSRF token from cookies or DOM
function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  if (cookieValue) {
    console.log('Found CSRF token in cookies:', cookieValue);
    return cookieValue;
  }
  const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
  if (csrfInput) {
    console.log('Found CSRF token in DOM:', csrfInput);
    return csrfInput;
  }
  console.error('CSRF token not found in cookies or DOM');
  return null;
}

// Basic input sanitization to prevent XSS
const sanitizeInput = (input) => input.replace(/[<>{}]/g, '');

function Profile() {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendUsername, setFriendUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ username: '', level: 'beginner' });
  const [csrfToken, setCsrfToken] = useState(null);

  // Fetch CSRF token once
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await fetch('http://localhost:8000/api/csrf/', {
          credentials: 'include',
          cache: 'no-store',
        });
        const token = getCSRFToken();
        if (token) setCsrfToken(token);
        else throw new Error('No CSRF token available');
      } catch (err) {
        setErrors((prev) => ({ ...prev, csrf: err.message }));
        console.error('Failed to fetch CSRF token:', err);
      }
    };
    fetchCsrfToken();
  }, []);

  // Fetch user data
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/home/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        console.log('Fetched user data:', data);
        setUserData(data);
        
        // Ensure friends is always an array
        if (Array.isArray(data.friends)) {
          console.log('Setting friends from API:', data.friends);
          setFriends(data.friends);
        } else {
          console.log('No friends data or invalid format received from API');
          setFriends([]);
        }
        
        setFormData({
          username: data.username || data.name || '',
          level: data.level || 'beginner',
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setErrors((prev) => ({ ...prev, profile: err.message }));
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (csrfToken) fetchData();
    return () => controller.abort();
  }, [csrfToken]);

  // Handle file upload
  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setErrors((prev) => ({ ...prev, upload: 'Only JPEG, PNG, or GIF images are allowed' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, upload: 'File size must be less than 5MB' }));
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('csrfmiddlewaretoken', csrfToken);

        const response = await fetch('http://localhost:8000/home/profile/picture/', {
          method: 'POST',
          headers: { 'X-CSRFToken': csrfToken },
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Upload failed: ${response.status} ${errorData}`);
        }
        const data = await response.json();
        setUserData((prev) => ({ ...prev, profile_picture: data.profile_picture }));
        setSuccess((prev) => ({ ...prev, upload: 'Profile picture uploaded successfully!' }));
        setTimeout(() => setSuccess((prev) => ({ ...prev, upload: null })), 2000);
      } catch (err) {
        setErrors((prev) => ({ ...prev, upload: err.message }));
        console.error('Error uploading profile picture:', err);
      } finally {
        setUploading(false);
      }
    },
    [csrfToken]
  );

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  }, []);

  // Update profile
  const handleUpdateProfile = useCallback(
    async (e) => {
      e.preventDefault();
      setErrors((prev) => ({ ...prev, update: null }));
      setSuccess((prev) => ({ ...prev, update: null }));

      try {
        if (!csrfToken) throw new Error('No CSRF token available');

        const response = await fetch('http://localhost:8000/home/profile/update/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to update profile: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        setUserData((prev) => ({ ...prev, ...data }));
        setSuccess((prev) => ({ ...prev, update: 'Profile updated successfully!' }));
        setTimeout(() => {
          setIsEditing(false);
          setSuccess((prev) => ({ ...prev, update: null }));
        }, 2000);
      } catch (err) {
        setErrors((prev) => ({ ...prev, update: err.message }));
        console.error('Error updating profile:', err);
      }
    },
    [csrfToken, formData]
  );

  // Add friend
  const handleAddFriend = useCallback(
    async (e) => {
      e.preventDefault();
      setErrors((prev) => ({ ...prev, friend: null }));
      setSuccess((prev) => ({ ...prev, friend: null }));

      const sanitizedUsername = sanitizeInput(friendUsername);
      if (!sanitizedUsername) {
        setErrors((prev) => ({ ...prev, friend: 'Invalid username' }));
        return;
      }

      try {
        if (!csrfToken) throw new Error('No CSRF token available');

        const response = await fetch('http://localhost:8000/home/api/add_friend/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ username: sanitizedUsername }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to add friend: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        console.log('Friend added successfully:', data.friend);
        
        // Make sure we're properly updating the state with the new friend
        if (data.friend) {
          setFriends(prevFriends => {
            // Create a new array to ensure React detects the state change
            const updatedFriends = [...prevFriends];
            // Check if friend isn't already in the list to avoid duplicates
            const existingFriend = updatedFriends.find(f => 
              f.id === data.friend.id || f.username === data.friend.username
            );
            if (!existingFriend) {
              updatedFriends.push(data.friend);
            }
            return updatedFriends;
          });
        }
        
        setSuccess((prev) => ({ ...prev, friend: 'Friend added successfully!' }));
        setFriendUsername('');
        setTimeout(() => setSuccess((prev) => ({ ...prev, friend: null })), 2000);
      } catch (err) {
        setErrors((prev) => ({ ...prev, friend: err.message }));
        console.error('Error adding friend:', err);
      }
    },
    [csrfToken, friendUsername]
  );

  // Logout
  const handleLogout = useCallback(async () => {
    if (!window.confirm('Are you sure you want to log out?')) return;

    try {
      if (!csrfToken) throw new Error('No CSRF token available');

      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Logout failed with status:', response.status);
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  }, [csrfToken]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (isEditing) {
      setFormData({
        username: userData.username || userData.name || '',
        level: userData.level || 'beginner',
      });
    }
    setIsEditing((prev) => !prev);
    setErrors((prev) => ({ ...prev, update: null }));
    setSuccess((prev) => ({ ...prev, update: null }));
  }, [userData]);

  // Get level class for styling
  const getLevelClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'level-beginner';
      case 'intermediate':
        return 'level-intermediate';
      case 'advanced':
        return 'level-advanced';
      case 'pro':
      case 'professional':
        return 'level-pro';
      default:
        return 'level-beginner';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Error state
  if (errors.profile || !userData) {
    return (
      <div className="error-container">
        <h3 className="error-title">Error loading profile</h3>
        <p className="error-message">{errors.profile || 'Please sign in to view your profile.'}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  // Calculate win rate
  const winRate = userData.stats?.matches > 0 ? Math.round((userData.stats.wins / userData.stats.matches) * 100) : 0;

  return (
    <div className="profile-container">
      <div className="container mx-auto px-4">
        <div className="profile-header">
          <h1 className="profile-title">Player Profile</h1>
          <div className="btn-group">
            <button onClick={toggleEditMode} className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 7H12V5.414zM10 9a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
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
                  <label className="file-upload-label">
                    <span className="btn btn-sm btn-secondary">
                      {uploading ? 'Uploading...' : 'Change Picture'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="file-input"
                    />
                  </label>
                  {uploading && <div className="upload-progress-indicator">Uploading...</div>}
                  {errors.upload && <p className="error-message">{errors.upload}</p>}
                  {success.upload && <p className="success-message">{success.upload}</p>}
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

                      {errors.update && <p className="error-message">{errors.update}</p>}
                      {success.update && <p className="success-message">{success.update}</p>}

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
            </div>

            <div className="section-card">
              <h3 className="section-title">Friends</h3>
              <form onSubmit={handleAddFriend} className="add-friend-form">
                <input
                  type="text"
                  value={friendUsername}
                  onChange={(e) => setFriendUsername(sanitizeInput(e.target.value))}
                  placeholder="Enter friend's username"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Add Friend
                </button>
              </form>

              {errors.friend && <p className="error-message">{errors.friend}</p>}
              {success.friend && <p className="success-message">{success.friend}</p>}

              <ul className="friends-list">
                {friends.length === 0 ? (
                  <li className="no-friends-message">No friends added yet</li>
                ) : (
                  friends.map((friend) => (
                    <li key={friend.id || friend.username} className="friend-item">
                      <span>
                        {friend.username} {friend.email ? `(${friend.email})` : ''}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;