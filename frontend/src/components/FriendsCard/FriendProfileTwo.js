import React from "react";
import Avatar from "../user/Avatar";
import "./FriendProfile.css";

const FriendProfileTwo = ({ token, friend }) => {
  return (
    <div id="friend-profile">
      <Avatar size={120} user={friend} />
      <p className="username">{friend.username}</p>
    </div>
  );
};
export default FriendProfileTwo;
