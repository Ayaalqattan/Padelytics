// import React, { useEffect, useState } from 'react';
// import './Profile.css';

// // Enhanced function to retrieve CSRF Token from cookies or HTML
// function getCSRFToken() {
//   // Try to get from cookies first
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('csrftoken='));
  
//   if (cookieValue) {
//     const token = cookieValue.split('=')[1];
//     console.log('Found CSRF token in cookies:', token);
//     return token;
//   }
  
//   // If not in cookies, try to find it in the DOM (Django sometimes includes it)
//   const csrfInputElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
//   if (csrfInputElement) {
//     const token = csrfInputElement.value;
//     console.log('Found CSRF token in DOM:', token);
//     return token;
//   }
  
//   console.error('CSRF token not found in cookies or DOM');
//   return null;
// }

// function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [friends, setFriends] = useState([]);
//   const [friendUsername, setFriendUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [friendError, setFriendError] = useState(null);
//   const [friendSuccess, setFriendSuccess] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);
  
//   // State for form data
//   const [formData, setFormData] = useState({
//     username: '',
//     level: 'beginner'
//   });
//   const [updateSuccess, setUpdateSuccess] = useState(null);
//   const [updateError, setUpdateError] = useState(null);

//   useEffect(() => {
//     // First: Explicitly fetch CSRF token from server
//     fetch('http://localhost:8000/api/csrf/', {
//       credentials: 'include',
//       cache: 'no-store', // Prevent caching
//     }).then(() => {
//       // Log CSRF Token from cookies for debugging
//       console.log('CSRF Token from cookies after /api/csrf/ call:', getCSRFToken());

//       // After getting CSRF, fetch user data
//       return fetch('http://localhost:8000/home/profile/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCSRFToken(), // Add token to GET request as well
//         },
//         credentials: 'include'
//       });
//     }).then(response => {
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }
//       return response.json();
//     }).then(data => {
//       setUserData(data);
//       setFriends(data.friends || []);
//       // Initialize form data with current user data
//       setFormData({
//         username: data.username || data.name || '',
//         level: data.level || 'beginner'
//       });
//     }).catch(err => {
//       setError(err.message);
//       console.error('Error fetching user data:', err);
//     }).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   // Completely reworked file upload function using XMLHttpRequest instead of fetch
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     try {
//       // First, explicitly request a new CSRF token
//       await fetch('http://localhost:8000/api/csrf/', {
//         credentials: 'include',
//         cache: 'no-store', // Prevent caching
//       });

//       // Get the freshly issued CSRF token
//       const csrfToken = getCSRFToken();
//       console.log('Fresh CSRF Token for file upload:', csrfToken);
      
//       if (!csrfToken) {
//         throw new Error('No CSRF token available. Try refreshing the page.');
//       }
      
//       // Create a FormData object
//       const formData = new FormData();
//       formData.append('profile_picture', file);
//       // Also include the CSRF token in the form data
//       formData.append('csrfmiddlewaretoken', csrfToken);
      
//       // Use XMLHttpRequest instead of fetch for file uploads
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
        
//         xhr.open('POST', 'http://localhost:8000/home/profile/picture/', true);
//         xhr.withCredentials = true; // Include cookies
        
//         // Set the CSRF token in the header
//         xhr.setRequestHeader('X-CSRFToken', csrfToken);
        
//         xhr.onload = function() {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             try {
//               const data = JSON.parse(xhr.responseText);
//               setUserData(prev => ({ ...prev, profile_picture: data.profile_picture }));
//               alert('Profile picture uploaded successfully!');
//               resolve(data);
//             } catch (e) {
//               reject(new Error('Invalid response format'));
//             }
//           } else {
//             console.error('Server response:', xhr.responseText);
//             reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
//           }
//         };
        
//         xhr.onerror = function() {
//           reject(new Error('Network error during upload'));
//         };
        
//         xhr.upload.onprogress = function(e) {
//           if (e.lengthComputable) {
//             const percentComplete = Math.round((e.loaded / e.total) * 100);
//             console.log(`Upload progress: ${percentComplete}%`);
//           }
//         };
        
//         xhr.send(formData);
//       });
//     } catch (err) {
//       alert(err.message);
//       console.error('Error uploading profile picture:', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Enhanced profile update function with better CSRF handling
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setUpdateError(null);
//     setUpdateSuccess(null);

//     try {
//       const csrfToken = getCSRFToken();
//       console.log('Using CSRF Token for profile update:', csrfToken);
      
//       if (!csrfToken) {
//         throw new Error('No CSRF token available. Try refreshing the page.');
//       }
      
//       const response = await fetch('http://localhost:8000/home/profile/update/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': csrfToken,
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('Server response:', errorData);
//         throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setUserData(prev => ({ ...prev, ...data }));
//       setUpdateSuccess('Profile updated successfully!');
      
//       // Exit edit mode after successful update
//       setTimeout(() => {
//         setIsEditing(false);
//         setUpdateSuccess(null);
//       }, 2000);
//     } catch (err) {
//       setUpdateError(err.message);
//       console.error('Error updating profile:', err);
//     }
//   };

//   // Enhanced add friend function with better CSRF handling
//   const handleAddFriend = async (e) => {
//     e.preventDefault();
//     setFriendError(null);
//     setFriendSuccess(null);

//     try {
//       const csrfToken = getCSRFToken();
//       console.log('Using CSRF Token for add friend:', csrfToken);
      
//       if (!csrfToken) {
//         throw new Error('No CSRF token available. Try refreshing the page.');
//       }
      
//       const response = await fetch('http://localhost:8000/api/add-friend/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': csrfToken,
//         },
//         body: JSON.stringify({ username: friendUsername }),
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('Server response:', errorData);
//         throw new Error(`Failed to add friend: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setFriends([...friends, data.friend]);
//       setFriendSuccess('Friend added successfully!');
//       setFriendUsername('');
//     } catch (err) {
//       setFriendError(err.message);
//       console.error('Error adding friend:', err);
//     }
//   };

//   // Enhanced logout function with better CSRF handling
//   const handleLogout = async () => {
//     try {
//       const csrfToken = getCSRFToken();
//       console.log('Using CSRF Token for logout:', csrfToken);
      
//       if (!csrfToken) {
//         throw new Error('No CSRF token available. Try refreshing the page.');
//       }
      
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
//   };

//   const toggleEditMode = () => {
//     if (isEditing) {
//       // Reset form data when canceling edit
//       setFormData({
//         username: userData.username || userData.name || '',
//         level: userData.level || 'beginner'
//       });
//     }
//     setIsEditing(!isEditing);
//     setUpdateError(null);
//     setUpdateSuccess(null);
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

//                       {updateError && <p className="error-message">{updateError}</p>}
//                       {updateSuccess && <p className="success-message">{updateSuccess}</p>}

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
//                 <div className="progress-bar" style={{ width: `${getLevelProgress(userData.level)}%` }}></div>
//               </div>
//             </div>

//             <div className="section-card">
//               <h3 className="section-title">Friends</h3>

//               <form onSubmit={handleAddFriend} className="add-friend-form">
//                 <input
//                   type="text"
//                   value={friendUsername}
//                   onChange={(e) => setFriendUsername(e.target.value)}
//                   placeholder="Enter friend's username"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary">Add Friend</button>
//               </form>

//               {friendError && <p className="error-message">{friendError}</p>}
//               {friendSuccess && <p className="success-message">{friendSuccess}</p>}

//               <ul className="friends-list">
//                 {friends.length === 0 ? (
//                   <li className="no-friends-message">No friends added yet</li>
//                 ) : (
//                   friends.map(friend => (
//                     <li key={friend.id || friend.username} className="friend-item">
//                       <span>{friend.username} {friend.email ? `(${friend.email})` : ''}</span>
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

// Use a hardcoded API base URL. To use environment variables, create a .env file with
// REACT_APP_API_URL="your-api-url" and ensure your build tool (e.g., Create React App, Vite)
// injects process.env.REACT_APP_API_URL into the browser environment.
const API_BASE_URL = 'http://localhost:8000';

// Function to retrieve CSRF token from cookies or DOM
function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  if (cookieValue) return cookieValue;
  const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
  if (csrfInput) return csrfInput;
  console.error('CSRF token not found');
  return null;
}

// Function to fetch CSRF token
async function fetchCsrfToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/csrf/`, {
      credentials: 'include',
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch CSRF token');
    const data = await response.json();
    const token = data.csrfToken || getCSRFToken();
    if (!token) throw new Error('CSRF token not found');
    return token;
  } catch (err) {
    console.error('Error fetching CSRF token:', err);
    throw err;
  }
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

  // Clear errors after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setErrors({}), 3000);
    return () => clearTimeout(timer);
  }, [errors]);

  // Fetch CSRF token once
  useEffect(() => {
    const initCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (err) {
        setErrors((prev) => ({ ...prev, csrf: err.message }));
      }
    };
    initCsrfToken();
  }, []);

  // Fetch user data
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/home/profile/`, {
          method: 'GET',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        setUserData(data);
        setFriends(data.friends || []);
        setFormData({
          username: data.username || data.name || '',
          level: data.level || 'beginner',
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setErrors((prev) => ({ ...prev, profile: err.message }));
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
        setErrors((prev) => ({ ...prev, upload: 'Only JPEG, PNG, or GIF allowed' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, upload: 'File size must be < 5MB' }));
        return;
      }

      setUploading(true);
      try {
        let token = csrfToken;
        if (!token) {
          token = await fetchCsrfToken();
          setCsrfToken(token);
        }

        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('csrfmiddlewaretoken', token);

        const response = await fetch(`${API_BASE_URL}/home/profile/picture/`, {
          method: 'POST',
          headers: { 'X-CSRFToken': token },
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 403) {
            token = await fetchCsrfToken();
            setCsrfToken(token);
            formData.set('csrfmiddlewaretoken', token);
            const retryResponse = await fetch(`${API_BASE_URL}/home/profile/picture/`, {
              method: 'POST',
              headers: { 'X-CSRFToken': token },
              body: formData,
              credentials: 'include',
            });
            if (!retryResponse.ok) throw new Error('Upload failed after retry');
            const retryData = await retryResponse.json();
            setUserData((prev) => ({ ...prev, profile_picture: retryData.profile_picture }));
          } else {
            throw new Error(`Upload failed: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setUserData((prev) => ({ ...prev, profile_picture: data.profile_picture }));
        }

        setSuccess((prev) => ({ ...prev, upload: 'Profile picture uploaded!' }));
        setTimeout(() => setSuccess((prev) => ({ ...prev, upload: null })), 2000);
      } catch (err) {
        setErrors((prev) => ({ ...prev, upload: err.message }));
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
      if (!csrfToken) {
        setErrors((prev) => ({ ...prev, update: 'No CSRF token available' }));
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/home/profile/update/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`Failed to update profile: ${response.status}`);
        const data = await response.json();
        setUserData((prev) => ({ ...prev, ...data }));
        setSuccess((prev) => ({ ...prev, update: 'Profile updated!' }));
        setTimeout(() => {
          setIsEditing(false);
          setSuccess((prev) => ({ ...prev, update: null }));
        }, 2000);
      } catch (err) {
        setErrors((prev) => ({ ...prev, update: err.message }));
      }
    },
    [csrfToken, formData]
  );

  // Add friend
  const handleAddFriend = useCallback(
    async (e) => {
      e.preventDefault();
      const sanitizedUsername = sanitizeInput(friendUsername);
      if (!sanitizedUsername) {
        setErrors((prev) => ({ ...prev, friend: 'Invalid username' }));
        return;
      }

      try {
        if (!csrfToken) throw new Error('No CSRF token available');
        const response = await fetch(`${API_BASE_URL}/api/add-friend/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ username: sanitizedUsername }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to add friend: ${response.status} ${errorData.message || ''}`);
        }

        const data = await response.json();
        console.log('Add friend response:', data); // Debug log
        // Ensure friend object has required properties
        const newFriend = {
          id: data.friend?.id || Date.now(), // Fallback ID
          username: data.friend?.username || sanitizedUsername,
          email: data.friend?.email || '',
        };
        setFriends((prev) => {
          const updatedFriends = [...prev, newFriend];
          console.log('Updated friends list:', updatedFriends); // Debug log
          return updatedFriends;
        });
        setSuccess((prev) => ({ ...prev, friend: `Added ${sanitizedUsername}!` }));
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
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        if (csrfToken) {
          await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
          });
        }
      } catch (err) {
        console.error('Logout failed:', err);
      } finally {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
  }, [csrfToken]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (isEditing) {
      setFormData({
        username: userData?.username || userData?.name || '',
        level: userData?.level || 'beginner',
      });
    }
    setIsEditing((prev) => !prev);
  }, [userData]);

  // Level progress and class
  const getLevelProgress = (level) => {
    const levels = { beginner: 25, intermediate: 50, advanced: 75, pro: 95, professional: 95 };
    return levels[level?.toLowerCase()] || 25;
  };

  const getLevelClass = (level) => {
    const classes = {
      beginner: 'level-beginner',
      intermediate: 'level-intermediate',
      advanced: 'level-advanced',
      pro: 'level-pro',
      professional: 'level-pro',
    };
    return classes[level?.toLowerCase()] || 'level-beginner';
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container" aria-busy="true">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Error state
  if (errors.profile || !userData) {
    return (
      <div className="error-container">
        <h3 className="error-title">Error loading profile</h3>
        <p className="error-message">{errors.profile || 'Please sign in.'}</p>
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
            <button onClick={toggleEditMode} className="btn btn-primary" aria-label={isEditing ? 'Cancel Edit' : 'Edit Profile'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button onClick={handleLogout} className="btn btn-danger" aria-label="Logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
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
                    <span className="btn btn-sm btn-secondary" aria-busy={uploading}>
                      {uploading ? 'Uploading...' : 'Change Picture'}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="file-input"
                      aria-label="Upload profile picture"
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
                          aria-required="true"
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
                          aria-required="true"
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

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${getLevelProgress(userData.level)}%` }}
                  aria-label={`Level progress: ${getLevelProgress(userData.level)}%`}
                ></div>
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
                  aria-required="true"
                  className="form-control"
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
                  friends.map((friend, index) => (
                    <li
                      key={friend.id || friend.username || `friend-${index}`}
                      className="friend-item"
                    >
                      <span>
                        {friend.username || 'Unknown User'}{' '}
                        {friend.email ? `(${friend.email})` : ''}
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