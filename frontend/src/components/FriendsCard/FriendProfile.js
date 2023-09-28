import Avatar from "../user/Avatar";
import "./FriendProfile.css"
import React, { useEffect, useState } from "react";

const FriendProfile = ({user, token}) => {

    const colors = ['rgb(165, 197, 220)','#F0F7D4','#B2D732','#347B98','#e6db74','#f7cac9','#955251','#B565A7','#009B77','#D65076'];
    const random_color = colors[Math.floor(Math.random() * colors.length)];

    const [followed, setFollowed] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (token) {
            fetch("/users", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => response.json())
            .then(async (data) => {
                setFriends(data.user.friends_array)
                if(data.user.friends_array.includes(user._id)) {
                    setFollowed(true)
                } else {setFollowed(false)}
                }
                );
            }
        }, []);

    const onButtonClick = (event) => {

        event.preventDefault();

        const data = {
        userId: user._id,
        };

        let method = "POST";
        if (followed) {
            method = "PUT";
          }
    
        if (token) {
            fetch("/friendsarray", {
            method: method,
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
            return response.json();
        }).then((data) => {
            const filteredFollows = data.user.friends_array.filter((friend) => {
                return friend === user._id;
              });
              console.log(filteredFollows)
              if (filteredFollows.length > 0) {
                setFollowed(true);
              } else {
                setFollowed(false);
              }
        });
        } else {
            console.log("No token!");
        }
    };

    return (
        <div id="friend-profile">
            <Avatar size={120} user={user}/> 
            <p className="username">{user.username}</p>
            <button className="btn modal-btn btn-primary" onClick={onButtonClick}>{followed?"Followed":"Follow Friend"}</button>
        </div>
    );
    }
export default FriendProfile;

