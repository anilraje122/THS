import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* Functional Component */
function Navbar({ title, icon }) {
  return (
    <nav className="navbar bg-primary">
      <a href="/">
        <h1>
          <i className={icon}></i> {title}
        </h1>
      </a>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
// Define default props
Navbar.defaultProps = {
  icon: "fab fa-github",
};
// Define prop types
Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
};

/* Class Component */
// class Navbar extends Component {
//   // Define default props
//   static defaultProps = {
//     icon: "fab fa-github",
//   };
//   // Define prop types
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     icon: PropTypes.string.isRequired,
//   };
//   render() {
//     return (
//       <nav className="navbar bg-primary">
//         <h1>
//           <i className={this.props.icon}></i> {this.props.title}
//         </h1>
//       </nav>
//     );
//   }
// }

export default Navbar;
