// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import './Signup.css';

// function Signup() {
//   const navigate = useNavigate();
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [agreeTerms, setAgreeTerms] = useState(false);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Signup submitted:', { fullName, email, password, confirmPassword, agreeTerms });
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <div className="signup-header">
//           <h1>Create Account</h1>
//           <p>Join us today and get started</p>
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
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//               </svg>
//             </span>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
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
          
//           <div className="input-group">
//             <span className="input-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//               </svg>
//             </span>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="terms-agreement">
//             <label className="terms-checkbox">
//               <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
//               <span>I agree to the Terms of Service and Privacy Policy</span>
//             </label>
//           </div>
          
//           <button type="submit" className="signup-button">
//             Create Account
//           </button>
          
//           <div className="login-link">
//   <p>
//     Already have an account?{" "}
//     <button
//       type="button"
//       onClick={() => navigate('/login')}
//     >
//       Log In
//     </button>
//   </p>
// </div>

//           {/* <div className="login-link">
//             <p> Already have an account?{" "}
//               <button
//                 type="button" onClick={() => console.log('Login clicked')} >  Log In
//               </button>
//             </p>
//           </div> */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("تم التسجيل بنجاح!");
        navigate('/login');
      } else {
        setError(data.message || "حدث خطأ أثناء التسجيل");
      }

    } catch (error) {
      setError("فشل الاتصال بالسيرفر");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* حقل اسم المستخدم */}
          <div className="input-group">
            <span className="input-icon">
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

          {/* حقل البريد الإلكتروني */}
          <div className="input-group">
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* حقل كلمة المرور */}
          <div className="input-group">
            <span className="input-icon">
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

          {/* حقل تأكيد كلمة المرور */}
          <div className="input-group">
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* موافقة على الشروط */}
          <div className="terms-agreement">
            <label className="terms-checkbox">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          {/* عرض رسالة الخطأ إن وجدت */}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signup-button">
            Create Account
          </button>

          <div className="login-link">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
