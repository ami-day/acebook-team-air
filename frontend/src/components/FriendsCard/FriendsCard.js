import "./FriendsCard.css";
import React, { useEffect, useState } from "react";
import FriendProfile from "./FriendProfile";
import FriendsModal from "../feed/FriendsModal";
import FriendProfileTwo from "./FriendProfileTwo";

const FriendsCard = ({setModal, token}) => {

    const showModal = () => {
        setModal(true);
    }

    const [friends,setFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    
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
                }
                );
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetch("/allusers", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => response.json())
            .then(async (data) => {
                setAllUsers(data.users)
                }
                );
        }
    }, []);

    let filteredUsers = []
    if (friends != undefined & friends != [] & friends != null & allUsers != undefined & allUsers != [] & allUsers != null) {
        filteredUsers = allUsers.filter((user) => friends.includes(user._id))
        }

    if (filteredUsers === undefined || filteredUsers === [] || filteredUsers === null) {
        return (
            <div id="friends-card">
            <div id="card-btns">
                <h3 style={{textAlign:'center', fontSize:'1.5rem'}}>Friends</h3>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
            </div>
            <div id="friend-profiles">
            </div>
        </div>
        ) } else {
        return (
            <div id="friends-card">
            <div id="card-btns">
                <h3 style={{textAlign:'center', fontSize:'1.5rem'}}>Friends</h3>
                <button className="btn btn-primary" onClick={showModal}>Find Friends</button>
            </div>
            <div id="friend-profiles">
                {filteredUsers.map((friend) => ( 
                <FriendProfileTwo token={token} user={friend} key={friend._id}></FriendProfileTwo>
                ))}
            </div>
        </div>
        )
    }
}
export default FriendsCard;