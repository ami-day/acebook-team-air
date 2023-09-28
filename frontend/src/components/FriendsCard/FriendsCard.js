import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfileTwo from "./FriendProfileTwo";

const FriendsCard = ({ setModal, token, user, myFriends }) => {
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
          <FriendProfileTwo
            token={token}
            friend={friend}
            key={friend._id}
          ></FriendProfileTwo>
        ))}
      </div>
    </div>
  );
};

export default FriendsCard;
