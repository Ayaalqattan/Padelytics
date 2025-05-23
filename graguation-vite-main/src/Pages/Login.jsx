import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        {
          email,             // البريد الإلكتروني
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
              {/* أيقونة البريد الإلكتروني */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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