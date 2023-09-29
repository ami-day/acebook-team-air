import React, { useState, useEffect, useRef } from "react";
import "./ProfileCard.css";
import Avatar from "../user/Avatar";

const ProfileCard = ({ user, setUser, posts }) => {
  const inputRef = useRef();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newAvatar, setNewAvatar] = useState(null);
  const photos = posts
    .map((post) => {
      if (post.user._id === user._id) {
        return post.photo;
      }
    })
    .filter((photo) => photo);

  const handleAvatarChange = (event) => {
    console.log(event.target.files[0]);
    setNewAvatar(() => event.target.files[0]);
  };

  useEffect(() => {
    if (newAvatar) {
      const formData = new FormData();
      formData.append("avatar", newAvatar);
      if (token) {
        fetch(`/users/${user._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log("Post successfully added");
              return response.json();
            } else {
              console.log("Post not successfully added");
            }
          })
          .then((data) => {
            setUser(data.newUser);
          });
      } else {
        console.log("No token!");
      }
    }
  }, [newAvatar]);

  return (
    <div id="profile-card">
      <img
        className="cover-photo"
        src="https://images.unsplash.com/photo-1547626740-02cb6aed9ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />
      <div className="details">
        <div className="avatar-container">
          <Avatar size={300} user={user} />
          <i
            className="fa fa-pencil-square-o fa-lg"
            onClick={() => inputRef.current.click()}
            aria-hidden="true"
          ></i>
        </div>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="d-none"
          id="newAvatarInput"
          aria-hidden="true"
          ref={inputRef}
          onChange={handleAvatarChange}
        />

        <h3>My Photos</h3>
        <div className="photo-images">
          {photos.map((photo) => {
            return <img src={`/${photo}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
