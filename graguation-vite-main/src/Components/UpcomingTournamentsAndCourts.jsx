import React from 'react'
import imageone from "../assets/Screenshot 2025-03-23 041520.png"
import imagetwo from "../assets/Screenshot 2025-03-23 041550.png"
import imagethree from "../assets/Screenshot 2025-03-23 041619.png"
import imagefour from "../assets/Screenshot 2025-03-23 041637.png"
import "./UpcomingTournamentsAndCourts.css"


function UpcomingTournamentsAndCourts() {
  return (
    <div>
    <section className="flex justify-center items-center about-section bg-linear-to-r/srgb from-indigo-600 to-green-400 ">
        <h2 className="about-title"> UpComing Tournamets </h2>
      </section>
         <div className="carousel-container pt-3.5 flex justify-center bg-linear-to-r/srgb from-indigo-600 to-green-400 h-110">
      {/* Wrapper div to control overall carousel width */}
      <div className="max-w-2xl mx-auto"> {/* Adjust max-width as needed */}
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex justify-center w-full"> {/* Center the image */}
              <img
                src={imageone}
                className="h-85 object-cover" /> {/* Control height and object-fit */}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex justify-center w-full">
              <img
                src={imagetwo}
                className="h-85 object-cover" />
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex justify-center w-full">
              <img
                src={imagethree}
                className="h-85 object-cover" />
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex justify-center w-full">
              <img
                src={imagefour}
                className="h-85 object-cover" />
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UpcomingTournamentsAndCourts