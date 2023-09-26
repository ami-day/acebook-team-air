import './FriendsModal.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useEffect, useState } from "react";
import FriendProfile from '../FriendsCard/FriendProfile'


const FriendsModal = ({setModal, token}) => {

const [users,setUsers] = useState([]);

const closeButton = () => {
  setModal(false);
}

useEffect(() => {
  if (token) {
    fetch("/allusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setUsers(data.users)
      });
  }
}, []);

console.log(users)

return (
  <div id="find-friends">
<button id="closebtn" type="button" className="btn-close" onClick={closeButton}></button>
<h1>Find Friends</h1>
<p>This is where you can find friends!</p>
<div className="form">
  <i className="fa fa-search"></i>
  <input type="text" className="form-control form-input" placeholder="Search friends..."/>
  </div>
  <div id="friendProfile">
    {users && users.map((user) => (
                <FriendProfile user={user} key={user._id} />
              ))}
  </div>
</div>        
)
}
export default FriendsModal;

