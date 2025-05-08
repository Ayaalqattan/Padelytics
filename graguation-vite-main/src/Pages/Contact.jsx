import React from 'react'
import SectionOne from '../components/SectionOne'
import Footer from '../Components/Footer'
import FAQPage from '../Components/FAQ';
import contactImage from "../assets/pexels-roger-aribau-gisbert-19420784-15612080.jpg";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div>
    <SectionOne/>
<div className="relative w-full h-[400px]">
        <img src={contactImage} alt="contactImage" className="w-full h-full object-cover"/>

        {/* Gradient overlay */}
        <div className="absolute inset-0"></div>

        {/* Text over image */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg" style={{ color: "white" }} >Contact Us</h1>
        </div>
      </div>
<FAQPage/>
<Footer />
</div>
  )
}

export default Contact