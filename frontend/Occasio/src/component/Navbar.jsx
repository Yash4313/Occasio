// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { isAuthenticated, user, logout } = useContext(AuthContext);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-sty" to="/">Occasio</Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#AboutSection">About Us</a>
//             </li>

//             <li className="nav-item dropdown">
//               <button
//                 className="nav-link dropdown-toggle btn btn-link"
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//                 style={{ textDecoration: 'none'  }}
//               >
//                 Services
//               </button>
//               <ul className="dropdown-menu">
//                 <li><Link className="dropdown-item" to="/services/weddings">Weddings</Link></li>
//                 <li><Link className="dropdown-item" to="/services/corporate">Corporate Events</Link></li>
//                 <li><Link className="dropdown-item" to="/services/private">Private Parties</Link></li>
//               </ul>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="#pricing">Pricing</a>
//             </li>
    
//             <li className="nav-item">
//               <a className="nav-link" href="#ContactSection">Contact</a>
//             </li>
//             {isAuthenticated && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/profile">Profile</Link>
//               </li>
//             )}
//             {isAuthenticated && user?.role === 'admin' && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admin">Admin</Link>
//               </li>
//             )}
//           </ul>

//           <div className="d-flex">
//             {!isAuthenticated ? (
//               <>
//                 <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
//                 <Link className="btn btn-success" to="/register">Register</Link>
//               </>
//             ) : (
//               <>
//                 <span className="navbar-text text-light me-3">{user?.username}</span>
//                 <button className="btn btn-outline-light" onClick={logout}>Logout</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">

        {/* Logo */}
        <Link 
          className="fw-bold fs-4 text-decoration-none" 
          to="/" 
          style={{ color: "#672345" }}
        >
          Occasio
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav mx-auto gap-3">

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link text-dark" href="#AboutSection">About</a>
            </li>

            {/* Services */}
            <li className="nav-item">
              <a className="nav-link text-dark" href="#ServicesSection">Services</a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-dark" href="#pricing">Voices</a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-dark" href="#ContactSection">Contact</a>
            </li>

            {/* Profile */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/profile">
                  Profile
                </Link>
              </li>
            )}

            {/* Admin */}
            {isAuthenticated && user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin">
                  Admin
                </Link>
              </li>
            )}

          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-2">

            {!isAuthenticated ? (
              <>
                <Link 
                  className="btn btn-outline-dark rounded-pill px-3" 
                  to="/login"
                >
                  Login
                </Link>

                <Link 
                  className="btn rounded-pill px-4 text-white" 
                  to="/register"
                  style={{ backgroundColor: "#672345" }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="fw-medium text-dark">
                  {user?.username}
                </span>

                <button 
                  className="btn btn-outline-dark rounded-pill px-3"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
