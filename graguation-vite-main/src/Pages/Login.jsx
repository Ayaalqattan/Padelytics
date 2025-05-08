// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import './Login.css';

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted:', { username, password, rememberMe });
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>Welcome Back</h1>
//           <p>Please enter your credentials</p>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//               </svg>
//             </span>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="remember-forgot">
//             <label className="remember-me">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <span>Remember me</span>
//             </label>
//             <button 
//               type="button" 
//               className="forgot-password"
//               onClick={() => console.log('Forgot password clicked')}
//             >
//               Forgot password?
//             </button>
//           </div>
          
//           <button type="submit" className="login-button">
//             Sign In
//           </button>
          
//           <div className="register-link">
//   <p>
//     Don't have an account?{" "}
//     <button type="button" onClick={() => navigate('/signup')}>
//       Register
//     </button>
//   </p>
// </div>

//           {/* <div className="register-link">
//             <p> Don't have an account?{" "} <button type="button" onClick={() => console.log('Register clicked')} > Register </button>
//              </p>
//           </div> */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';  // استيراد axios
// import './Login.css';

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');  // لإظهار رسالة الخطأ

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // إرسال البيانات إلى API Django مع تضمين ملفات تعريف الارتباط
//       const response = await axios.post('http://127.0.0.1:8000/api/login/', {
//         username,
//         password,
//         rememberMe
//       }, {
//         withCredentials: true // ✅ أضفناها هنا
//       });

//       // إذا تم تسجيل الدخول بنجاح
//       if (response.data.message === 'تم تسجيل الدخول بنجاح!') {
//         navigate('/');  // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
//       } else {
//         setErrorMessage('فشل في تسجيل الدخول');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setErrorMessage('حدث خطأ أثناء محاولة تسجيل الدخول');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>Welcome Back</h1>
//           <p>Please enter your credentials</p>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//               </svg>
//             </span>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="remember-forgot">
//             <label className="remember-me">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <span>Remember me</span>
//             </label>
//             <button 
//               type="button" 
//               className="forgot-password"
//               onClick={() => console.log('Forgot password clicked')}
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* إظهار رسالة الخطأ إذا كان هناك خطأ */}
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
          
//           <button type="submit" className="login-button">
//             Sign In
//           </button>

//           <div className="register-link">
//             <p>
//               Don't have an account?{" "}
//               <button type="button" onClick={() => navigate('/signup')}>
//                 Register
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        {
          username,           // اسم المستخدم
          password,           // كلمة المرور
          remember_me: rememberMe
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // إذا استقبلنا رسالة نجاح من الـ API
      const msg = response.data.message;
      if (msg === 'تم تسجيل الدخول' || msg === 'تم تسجيل الدخول بنجاح' || msg === 'تم تسجيل الدخول بنجاح!') {
        // الانتقال للصفحة الرئيسية
        navigate('/');
        return;
      }

      // في حال كانت الرسالة ليست نجاح
      setErrorMessage(response.data.message || 'فشل في تسجيل الدخول');
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data) {
        console.log('API error details:', error.response.data);
        setErrorMessage(error.response.data.message || 'حدث خطأ أثناء محاولة تسجيل الدخول');
      } else {
        setErrorMessage('حدث خطأ أثناء محاولة تسجيل الدخول');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">
              {/* أيقونة المستخدم */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              {/* أيقونة القفل */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button 
              type="button" 
              className="forgot-password"
              onClick={() => console.log('Forgot password clicked')}
            >
              Forgot password?
            </button>
          </div>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/signup')}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
