import Avatar from "../user/Avatar";
import "./FriendProfile.css";
import React, { useEffect, useState } from "react";

const FriendProfile = ({ friend, token, user, myFriends, setMyFriends }) => {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (
      myFriends.filter((myfriend) => myfriend._id === friend._id).length > 0
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [myFriends]);

  const onButtonClick = (event) => {
    event.preventDefault();

    let method = "POST";
    if (followed) {
      method = "PUT";
    }

    if (token) {
      fetch("/friends", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: friend._id,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("friend successfully added");
            return response.json();
          } else {
            console.log("friend not successfully added");
          }
        })
        .then((data) => {
          setMyFriends(data.user.friends_array);
          const filteredFollows = data.user.friends_array.filter((friend) => {
            return friend === user._id;
          });
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
      <Avatar size={120} user={friend} />
      <p className="username">{friend.username}</p>
      <button className="btn modal-btn btn-primary" onClick={onButtonClick}>
        {followed ? "Followed" : "Follow Friend"}
      </button>
    </div>
  );
};
export default FriendProfile;
