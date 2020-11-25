import React from "react";
import { Link } from "react-router-dom";

/* Functional component */
function UserItem(props) {
  const { login, avatar_url, html_url } = props.user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: 200 }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark">
          Github Profile
        </Link>
      </div>
    </div>
  );
}

/* Class Component */
// class UserItem extends Component {
//   render() {
//     const { login, avatar_url, html_url } = this.props.user;
//     return (
//       <div className="card text-center">
//         <img
//           src={avatar_url}
//           alt=""
//           className="round-img"
//           style={{ width: 200 }}
//         />
//         <h3>{login}</h3>
//         <div>
//           <a href={html_url} className="btn btn-dark btn-sm">
//             Github Profile
//           </a>
//         </div>
//       </div>
//     );
//   }
// }

export default UserItem;
