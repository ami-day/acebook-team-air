import "./FriendProfile.css"
import React, { useState } from "react";

const FriendProfile = () => {

    const onDivClick = () => {
        console.log("Div Clicked!");
    }

    return (
    <div onClick={onDivClick} id="friend-profile">
        <img className="avatar" src="https://avatars.githubusercontent.com/u/25744951?v=4"></img>
        <p className="username">Username</p>
     </div>
    )
}

export default FriendProfile;

