import React from "react";
import './navbar.css';

const Navbar = ({ onLogout }) => {


  return (
    <div>
      <nav className="nav" id="navbar">
        <h2>AceBook</h2>
        <div className="logout">
        <h5>username</h5>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
