import Avatar from "../user/Avatar";
import "./FriendProfile.css"
import React, { useEffect, useState } from "react";


const FriendProfileTwo = ({token}) => {
    const [user,setUser] = useState([])
    useEffect(() => {
        if (token) {
            fetch("/users", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => response.json())
            .then(async (data) => {
                console.log('friendprofiletwo')
                console.log(data.user.username);
                setUser(data.user)
            });
        }
    }, []);
    if (user){
        return (
            <div id="friend-profile">
                <Avatar size={120} user={user}/>
                <p className="username">{user.username}</p>
            </div>
        );
    } else{
        return (
            <div id="friend-profile"></div>
        )
    }
    }
export default FriendProfileTwo;

