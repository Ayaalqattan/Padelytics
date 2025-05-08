import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import UploadSection from '../Components/UploadSection';
import Team from '../components/Team';
import UpcomingTournamentsAndCourts from '../Components/UpcomingTournamentsAndCourts';
import Footer from "../Components/Footer"

const Home = () => {
  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <UploadSection/>
      <Team />
      <UpcomingTournamentsAndCourts/>
      <Footer/>
    </div>
  );
};

export default Home;