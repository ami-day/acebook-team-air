import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import FriendsModal from "../feed/FriendsModal";

const FriendsCard = () => {

    const [modal,setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    }

    if (modal) {
        return (
            <div id="friends-card">
            <div id="card-btns">
                <button className="btn btn-primary">Friends</button>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
            </div>
            <FriendsModal></FriendsModal>
            <div id="friend-profiles">
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
            </div>
        </div>
        )
    } else {

    return (
        <div id="friends-card">
            <div id="card-btns">
                <button className="btn btn-primary">Friends</button>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
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
}
export default FriendsCard;