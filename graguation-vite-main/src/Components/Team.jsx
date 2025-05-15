import "./Team.css";
import omar from "../assets/photo_2025-03-13_17-32-10.jpg";
import mostafa from "../assets/Screenshot 2025-03-13 174522.png";
import dalia from "../assets/photo_2024-06-23_23-40-56.jpg";
import mona from "../assets/IMG-20240926-WA0178.jpg";
import aya from "../assets/20250223_214645.jpg";
import rewan from "../assets/IMG-20240523-WA0079.jpg";
import rahma from "../assets/WhatsApp Image 2025-03-13 at 19.30.34_8a6a2415.jpg";
import merna from "../assets/photo_2025-03-13_19-33-30.jpg";
import mohamed from "../assets/Screenshot 2025-03-13 202941.png";
import youssef from "../assets/FB_IMG_1741891590239.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const teamMembers = [
  {
    name: "Aya Mostafa",
    role: "Web Team",
    image: aya,
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100048537861951",
      linkedin: "linkedin.com/in/aya-mostafa-771993283",
      email: "aya76035@gmail.com"
    }
  },
  {
    name: "Mona Ahmed",
    role: "Web Team",
    image: mona,
 Zodiac: "Taurus",
    social: {
      facebook: "https://www.facebook.com/mona.alqattan.35",
      linkedin: "www.linkedin.com/in/mona-el-qattan-ab751a2b9",
      email: "monaalqattan34@gmail.com"
    }
  },
  {
    name: "Omar Ali",
    role: "AI Team",
    image: omar,
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100016927782526",
      linkedin: "linkedin.com/in/eng-omargomaa",
      email: "omar.ali.goma.11@gmail.com"
    }
  },
  {
    name: "Dalia Said",
    role: "AI Team",
    image: dalia,
 Zodiac: "Cancer",
    social: {
      facebook: "https://www.facebook.com/daliaghazyy",
      linkedin: "linkedin.com/in/dalia-ghazy-b36538225",
      email: "daliaghazy2410@gmail.com"
    }
  },
  {
    name: "Mostafa Gamal",
    role: "AI Team",
    image: mostafa,
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100010058414370",
      linkedin: "linkedin.com/in/mostafa-gamal-mg",
      email: "mostafa.gamal2288822@gmail.com"
    }
  },
  {
    name: "Rewan Elhady",
    role: "Documentation Team",
    image: rewan,
    social: {
      facebook: "https://www.facebook.com/rawan.elhady.77",
      linkedin: "linkedin.com/in/rawan-elhady-081b2b229",
      email: "rawanelhady06@gmail.com"
    }
  },
  {
    name: "Rahma Emad",
    role: "Documentation Team",
    image: rahma,
 Zodiac: "Libra",
    social: {
      facebook: "https://www.facebook.com/rahma.emad.7965",
      linkedin: "https://linkedin.com/in/rahma-emad",
      email: "mailto:rahma.emad@example.com"
    }
  },
  {
    name: "Merna Hesham",
    role: "App Team",
    image: merna,
    social: {
      facebook: "https://www.facebook.com/merna.hesham.792",
      linkedin: "linkedin.com/in/merna-hesham-8a94b92b5",
      email: "mernahesham2003@gmail.com"
    }
  },
  {
    name: "Mohamed Awadeen",
    role: "App Team",
    image: mohamed,
 Zodiac: "Sagittarius",
    social: {
      facebook: "https://www.facebook.com/mo.awadeen",
      linkedin: "linkedin.com/in/mohamed-awadeen",
      email: "modyyahia44@gmail.com"
    }
  },
  {
    name: "Youssef Talaat",
    role: "App Team",
    image: youssef,
 Zodiac: "Capricorn",
    social: {
      facebook: "https://facebook.com/youssef.talaat",
      linkedin: "https://linkedin.com/in/youssef-talaat",
      email: "mailto:youssef.talaat@example.com"
    }
  }
];

function Team() {
  return (
    <div className="team-container">
      <section className="about-section" aria-labelledby="team-title">
        <h2 id="team-title" className="about-title">Our Team</h2>
      </section>
      <div className="team-members" role="list">
        {teamMembers.map((member, index) => (
          <div 
            className="card" 
            key={member.name} 
            role="listitem" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-info">
              <div className="info-container">
                <img 
                  src={member.image} 
                  alt={`${member.name}, ${member.role}`} 
                  loading="lazy"
                />
                <div className="title">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  {/* <p className="zodiac">{member.Zodiac}</p> */}
                  <div className="social-icons">
                    <a 
                      href={member.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s Facebook profile`}
                    >
                      <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                    </a>
                    <a 
                      href={member.social.email} 
                      aria-label={`Email ${member.name}`}
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;