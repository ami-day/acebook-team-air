import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";

const FriendsCard = ({ setModal, token, user, myFriends, setMyFriends }) => {
  return (
    <div id="friends-card">
      <div id="card-btns">
        <h3 style={{ textAlign: "center", fontSize: "1.5rem" }}>Friends</h3>
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          Find Friends
        </button>
      </div>
      <div id="friend-profiles">
        {myFriends.map((friend) => (
          <FriendProfile
            token={token}
            friend={friend}
            key={friend._id}
            myFriends={myFriends}
            setMyFriends={setMyFriends}
          ></FriendProfile>
        ))}
      </div>
    </div>
  );
};

export default FriendsCard;
