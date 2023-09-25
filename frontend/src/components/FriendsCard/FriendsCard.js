import "./FriendsCard.css";
import React from "react";
import FriendProfile from "./FriendProfile"

const FriendsCard = () => {

    return (
        <div id="friends-card">
            <div id="card-btns">
                <button className="btn btn-primary">Friends</button>
                <button className="btn btn-primary">Messages</button>
            </div>
            <div id="friend-profiles">
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
            </div>
        </div>
    )

    }
export default FriendsCard;