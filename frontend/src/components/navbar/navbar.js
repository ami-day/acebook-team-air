import React, { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = ({ onLogout, token, user }) => {
  return (
    <nav className="navbar" id="navbar">
      <a className="navbar-brand">
        <img
          className="d-inline-block align-text-top"
          src="/apple-touch-icon.png"
        />
        AceBook
      </a>
      <div className="navbar-right">
        <h5>{user.username}</h5>
        <img className="avatar" src={user.photo} />
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
