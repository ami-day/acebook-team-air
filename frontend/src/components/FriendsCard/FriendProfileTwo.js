import Avatar from "../user/Avatar";
import "./FriendProfile.css"
import React, { useEffect, useState } from "react";


const FriendProfileTwo = ({token, user}) => {

        return (
            <div id="friend-profile">
                <Avatar size={120} user={user}/>
                <p className="username">{user.username}</p>
        </div>
        );
    }
export default FriendProfileTwo;

