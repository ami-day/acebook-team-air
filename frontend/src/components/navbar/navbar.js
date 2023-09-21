import React, { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = ({ onLogout, token }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          setUser(data.user);
        });
    }
  }, []);
  return (
    <nav className="navbar" id="navbar">
      {/* <div className="container-fluid"> */}
      <a className="navbar-brand">
        <img
          className="d-inline-block align-text-top ms-3"
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
      {/* </div> */}
    </nav>
  );
};
export default Navbar;
