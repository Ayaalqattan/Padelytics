import './App.css'
import Login from "./Pages/Login"
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home";
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import Shop from './Pages/Shop';
import UploadSection from'./Components/UploadSection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fontsource/poppins";
import "@fontsource/roboto/400.css";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://localhost:8000/home/csrf/', {
      credentials: 'include',
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/UploadSection" element={<UploadSection />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
