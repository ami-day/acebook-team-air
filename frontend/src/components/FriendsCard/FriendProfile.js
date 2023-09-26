import "./FriendProfile.css"
import React, { useEffect, useState } from "react";

const FriendProfile = ({user}) => {

    const onDivClick = () => {
        console.log("Div Clicked!");
    }

    useEffect(() => {
        console.log("user:", user);
    })
    
    return (
        <div onClick={onDivClick} id="friend-profile">
            <img className="avatar" src="https://avatars.githubusercontent.com/u/25744951?v=4"></img>
            <p className="username">{user.username}</p>
        </div>
    )
}

export default FriendProfile;

