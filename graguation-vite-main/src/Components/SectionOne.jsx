
import"./SectionOne.css"
import { Link } from "react-router-dom";
const SectionOne = () => {
  return (
    <div className="header" id="header">
      <div className="container">
        <a href="#" className="logo">Padelytics</a>
        <ul className="main-nav">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/profile">PROFILE</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
        <Link to="/Login" className="btn-navBar">LOGIN</Link>
      </div>
    </div>
  );
}
export default SectionOne;