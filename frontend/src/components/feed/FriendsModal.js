import "./FriendsModal.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "../FriendsCard/FriendProfile";

const FriendsModal = ({ setModal, token, user, myFriends, setMyFriends }) => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [searchField, setSearchField] = useState("");

  const closeButton = () => {
    // window.location.reload();
    setModal(false);
  };

  useEffect(() => {
    if (token) {
      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setUsers(
            data.users.filter((returnedUser) => returnedUser._id !== user._id)
          );
        });
    }
  }, []);

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter((user) => {
        return user.username.toLowerCase().includes(searchField.toLowerCase());
      });
      console.log(filteredUsers);
      setFilteredUsers(filteredUsers);
    }
  }, [searchField, users]);

  return (
    <div id="find-friends">
      <button
        id="closebtn"
        type="button"
        className="btn-close"
        onClick={closeButton}
      ></button>
      <h1>Find Friends</h1>
      <p>This is where you can find friends!</p>
      <div className="form">
        <i className="fa fa-search"></i>
        <input
          onChange={handleSearch}
          type="text"
          className="form-control form-input"
          placeholder="Search friends..."
        />
      </div>
      <div id="friendProfile">
        {filteredUsers &&
          filteredUsers.map((filteredUser) => (
            <FriendProfile
              friend={filteredUser}
              user={user}
              token={token}
              key={filteredUser._id}
              myFriends={myFriends}
              setMyFriends={setMyFriends}
            />
          ))}
      </div>
    </div>
  );
};
export default FriendsModal;
