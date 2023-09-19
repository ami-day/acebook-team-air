import React from "react";

const Navbar = ({ onLogout }) => {
  const navbarStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "aliceblue",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    zIndex: "100",
  };

  return (
    <div>
      <nav className="nav" id="navbar" style={navbarStyle}>
        <h2>AceBook</h2>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};
export default Navbar;
