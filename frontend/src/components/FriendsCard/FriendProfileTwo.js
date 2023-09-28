import Avatar from "../user/Avatar";
import "./FriendProfile.css";
import React, { useEffect, useState } from "react";

const FriendProfileTwo = ({ token, friend }) => {
  return (
    <div id="friend-profile">
      <Avatar size={120} user={friend} />
      <p className="username">{friend.username}</p>
    </div>
  );
};
export default FriendProfileTwo;
