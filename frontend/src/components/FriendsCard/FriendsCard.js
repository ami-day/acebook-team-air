import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import FriendsModal from "../feed/FriendsModal";

const FriendsCard = ({setModal}) => {

    const showModal = () => {
        setModal(true);
    }

        return (
            <div id="friends-card">
            <div id="card-btns">
                <button className="btn btn-primary">Friends</button>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
            </div>
            <div id="friend-profiles">
                {/* // Need to add user prop before adding between tags */}
                {/* <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile> */}
            </div>
        </div>
        )
    }
export default FriendsCard;