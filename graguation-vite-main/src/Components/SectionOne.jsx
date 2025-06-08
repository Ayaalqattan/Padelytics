
// import"./SectionOne.css"
// import { Link } from "react-router-dom";
// const SectionOne = () => {
//   return (
//     <div className="header" id="header">
//       <div className="container">
//         <a href="#" className="logo">Padelytics</a>
//         <ul className="main-nav">
//           <li><Link to="/">HOME</Link></li>
//           <li><Link to="/shop">SHOP</Link></li>
//           <li><Link to="/profile">PROFILE</Link></li>
//           <li><Link to="/contact">CONTACT</Link></li>
//         </ul>
//         <Link to="/Login" className="btn-navBar">LOGIN</Link>
//       </div>
//     </div>
//   );
// }
// export default SectionOne; 
import "./SectionOne.css";
import { Link } from "react-router-dom";

const SectionOne = () => {
  const userName = localStorage.getItem('userName'); // 🟢 استخدمي المفتاح الصحيح

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

        {/* ✅ عرض الاسم إذا كان موجود، وإلا عرض زر Login */}
        {userName ? (
          <span className="btn-navBar">{userName}</span>
        ) : (
          <Link to="/Login" className="btn-navBar">LOGIN</Link>
        )}
      </div>
    </div>
  );
};

export default SectionOne;
