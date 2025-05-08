import "./Team.css";
import omar from "../assets/photo_2025-03-13_17-32-10.jpg";
import mostafa from "../assets/Screenshot 2025-03-13 174522.png";
import dalia from "../assets/photo_2024-06-23_23-40-56.jpg";
import mona from "../assets/IMG-20241007-WA0043_resized (2).jpg";
import aya from "../assets/20250223_214645.jpg";
import rewan from "../assets/IMG-20240523-WA0079.jpg";
import rahma from "../assets/WhatsApp Image 2025-03-13 at 19.30.34_8a6a2415.jpg";
import merna from "../assets/photo_2025-03-13_19-33-30.jpg";
import mohamed from "../assets/Screenshot 2025-03-13 202941.png";
import youssef from "../assets/FB_IMG_1741891590239.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Team() {
  return (
    <div>
      <section className="about-section">
        <h2 className="about-title">Team</h2>
      </section>
      <div className="team-members">
        {/* Card 1 - Aya */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={aya} alt="Aya Mostafa" />
              {/* Changed p to div for valid HTML */}
              <div className="title">
                Aya Mostafa <br />
                Web Team
                <div className="social-icons-team">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Mona */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={mona} alt="Mona Ahmed" />
              <div className="title">
                Mona Ahmed <br />
                Web Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Omar */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={omar} alt="Omar Ali" />
              <div className="title">
                Omar Ali <br />
                AI Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 - Dalia */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={dalia} alt="Dalia Said" />
              <div className="title">
                Dalia Said <br />
                AI Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 - Mostafa */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={mostafa} alt="Mostafa Gamal" />
              <div className="title">
                Mostafa Gamal <br />
                AI Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6 - Rewan */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={rewan} alt="Rewan Elhady" />
              <div className="title">
                Rewan Elhady <br />
                Documentation Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 7 - Rahma */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={rahma} alt="Rahma Emad" />
              <div className="title">
                Rahma Emad <br />
                Documentation Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 8 - Merna */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={merna} alt="Merna Hesham" />
              <div className="title">
                Merna Hesham <br />
                App Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 9 - Mohamed */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={mohamed} alt="Mohamed Awadeen" />
              <div className="title">
                Mohamed Awadeen <br />
                App Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 10 - Youssef */}
        <div className="card">
          <div className="card-info">
            <div className="info-container">
              <img src={youssef} alt="Youssef Talaat" />
              <div className="title">
                Youssef Talaat <br />
                App Team
                <div className="social-icons">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                  <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;