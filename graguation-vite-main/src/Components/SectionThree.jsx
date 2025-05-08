import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SectionThree.css";
import { faSquarePollVertical, faGear, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import AboutUsImage from "../assets/pexels-roger-aribau-gisbert-19420784-15612082.jpg"; // Ensure the path is correct

const SectionThree = () => {
  return (
    <>
      {/* About Us Title Section */}
      <section className="flex justify-center items-center py-20">
        <h2 className="text-3xl font-bold uppercase relative text-gray-800 after:content-[''] after:w-[60px] after:h-1 after:bg-[#004ec2] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded pb-7">
          About Us
        </h2>
      </section>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-start gap-15 px-4 mx-auto max-w-7xl ">
        {/* Features Section */}
        <div className="w-full padding-three lg:w-[30%] border border-gray-200 shadow-md p-5 rounded-lg bg-white transition-transform duration-300 hover:scale-105 mb-5 lg:mb-0">
          <div className="flex flex-col items-center padding-three">
            {/* Advanced Analytics */}
            <div className="w-full mb-6 sm:mb-4">
              <h5 className="text-lg font-bold mb-2 text-gray-800 flex items-center">
                Advanced Analytics
                <FontAwesomeIcon icon={faSquarePollVertical} className="text-[#9fe870] text-2xl ml-2" />
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                Get precise data on your padel performance, including detailed statistics and reports to help you improve your game.
              </p>
            </div>
            
            {/* Great Usability */}
            <div className="w-full mb-6 sm:mb-4">
              <h5 className="text-lg font-bold mb-2 text-gray-800 flex items-center">
                Great Usability
                <FontAwesomeIcon icon={faGear} className="text-[#9fe870] text-2xl ml-2" />
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                A simple and intuitive design that allows you to track and analyze your performance effortlessly, without requiring technical knowledge.
              </p>
            </div>
            
            {/* Unique Design */}
            <div className="w-full">
              <h5 className="text-lg font-bold mb-2 text-gray-800 flex items-center">
                Unique Design
                <FontAwesomeIcon icon={faPenFancy} className="text-[#9fe870] text-2xl ml-2" />
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                A sleek and modern interface that offers a seamless user experience, making data interaction both engaging and efficient.
              </p>
            </div>
          </div>
        </div>
        
        {/* Image Section - Responsive visibility */}
        <div className="w-full lg:w-[30%] transition-transform duration-300 hover:scale-105 mb-5 lg:mb-0">
          <img src={AboutUsImage} className="w-full h-auto rounded-lg object-cover" alt="About Us"/>
        </div>
        
        {/* Text Section */}
        <div className="w-full lg:w-[30%] padding-three border border-gray-200 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 p-7">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap padding-three">
            At Padelytics, we are passionate about helping padel players unlock their full potential through cutting-edge performance analysis. Whether you are a beginner looking to refine your skills or a seasoned player aiming for precision, our platform provides in-depth insights, statistics, and data-driven recommendations to enhance your game.

            Our mission is to bridge the gap between technology and sports, giving you the tools to track your progress, identify strengths, and improve weaknesses. With intuitive analytics and real-time feedback, we empower you to play smarter, train harder, and win more.
            
            <br/><br/>
            
            <b><p className="text-[#004ec2]">Join us and take your padel performance to the next level!</p></b>
          </p>
        </div>
      </div>
    </>
  );
};

export default SectionThree;