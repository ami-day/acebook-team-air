import React, {useEffect, useState} from "react";
import './navbar.css';



const Navbar = ({onLogout, token}) => {
  const [user, setUser] = useState("")

    useEffect(() => {
        if (token) {
          fetch("/users", {
            headers: {
              Authorization: `Bearer ${token}`,
          
            },
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data.user.email)
              setUser(data.user)
            });
        }
      }, []);
  return (
    <div>
      <nav className="nav" id="navbar">
        <h2>AceBook</h2>
        <div className="logout">
        <h5>{user.email}</h5>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
