import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import FriendsModal from "../feed/FriendsModal";
import FriendProfileTwo from "./FriendProfileTwo";

const FriendsCard = ({setModal, token}) => {

    const showModal = () => {
        setModal(true);
    }

        return (
            <div id="friends-card">
            <div id="card-btns">
                <h3 style={{textAlign:'center', fontSize:'1.5rem'}}>Friends</h3>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
            </div>
            <div id="friend-profiles">
                <FriendProfileTwo token={token}></FriendProfileTwo>
            </div>
        </div>
        )
    }
export default FriendsCard;