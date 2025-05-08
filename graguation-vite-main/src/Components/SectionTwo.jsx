import padel from "../assets/freepik__the-style-is-candid-image-photography-with-natural__10867-removebg-preview.png"
import "./SectionTwo.css"
import 'animate.css';

const SectionTwo = () => {
  return (
    <div>
      <header>
        <div className="header-content">
          <div className="header-text animate__animated animate__slideInLeft">
            <p>
              <b>Analyze,<br />Improve,Win<br /></b>
            </p>
            <p className="p-sectionTwo-two">
              Take Your Padel Skills to the Next Level!
            </p>
            <div className="download-buttons-container">
              <a  href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_ID"  target="_blank"  rel="noopener noreferrer" className="download-button google-play-btn" >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="button-icon" >
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.06 20.71 11.42 20.71 12C20.71 12.58 20.5 12.94 20.16 13.19L17.64 14.66L15.19 12.21L17.64 9.76L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
                </svg>
                Google Play
              </a>
              <a href="https://apps.apple.com/app/YOUR_APP_ID"  target="_blank"  rel="noopener noreferrer" className="download-button app-store-btn">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="currentColor" className="button-icon">
                  <path d="M15.76 7.51C15.32 8.37 14.55 9.07 13.79 9.02C13.65 8.36 14.01 7.64 14.41 7.19C14.86 6.64 15.7 6.29 16.35 6.22C16.43 6.96 16.11 7.69 15.76 7.51ZM16.41 9.2C15.77 9.16 15.22 9.47 14.82 9.47C14.43 9.47 13.77 9.19 13.25 9.19C12.22 9.21 11.26 9.85 10.76 10.83C9.69 12.79 10.51 15.47 11.54 16.94C12.04 17.66 12.69 18.45 13.53 18.42C14.03 18.41 14.38 18.16 14.97 18.16C15.56 18.16 15.86 18.42 16.41 18.42C17.28 18.4 17.85 17.63 18.33 16.91C18.88 16.1 19.11 15.31 19.12 15.27C19.11 15.26 18.13 14.84 18.12 13.64C18.11 12.61 18.88 12.11 19.11 11.96C18.41 10.84 17.23 10.71 16.88 10.69C16.41 10.65 15.95 10.91 15.69 10.91C15.39 10.91 14.97 10.68 14.55 10.68Z"/>
                </svg> 
                App Store
              </a>
            </div>
          </div>
          <div className="image-container">
            <img src={padel} className="hover-image" alt="padel racket" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default SectionTwo;