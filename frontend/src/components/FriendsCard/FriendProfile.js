import "./FriendProfile.css"
import React, { useEffect, useState } from "react";

const FriendProfile = ({user, token}) => {

    const colors = ['rgb(165, 197, 220)','#F0F7D4','#B2D732','#347B98','#e6db74','#f7cac9','#955251','#B565A7','#009B77','#D65076'];
    const random_color = colors[Math.floor(Math.random() * colors.length)];

    const onButtonClick = (event) => {
        console.log("Clicked!");
        console.log(user._id);
        event.preventDefault();
        const data = {
        user_id: user._id,
        };
    
        if (token) {
            fetch("/friendsarray", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            }).then((response) => {
            if (response.status === 201) {
                console.log("friend successfully added");
            } else {
                console.log("friend not successfully added");
            }
        });
        } else {
            console.log("No token!");
        }
    };

    
    return (
        <div id="friend-profile">
            {user.photo? (<img className="avatar" src={user.photo}></img>) : <div className="fallback" style={{backgroundColor: `${random_color}`}}>{user.username[0].toUpperCase()}</div>} 
            <p className="username">{user.username}</p>
            <button className="btn modal-btn btn-primary" onClick={onButtonClick}>Follow Friend</button>
        </div>
    );
    }
export default FriendProfile;

