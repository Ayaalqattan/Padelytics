import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import UploadButton from '../Components/UploadButton';
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
      <UploadButton/>
      <Team />
      <UpcomingTournamentsAndCourts/>
      <Footer/>
    </div>
  );
};

export default Home;