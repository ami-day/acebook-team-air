import React, { useState, useEffect, useRef } from "react";
import "./ProfileCard.css";
import Avatar from "../user/Avatar";

const ProfileCard = ({}) => {
  const inputRef = useRef();
  const [user, setUser] = useState();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setUser(data.user);
        });
    }
  }, []);

  const handleAvatarChange = (event) => {
    console.log(event.target.files[0]);
    setNewAvatar(() => event.target.files[0]);
    const formData = new FormData();
    formData.append("avatar", newAvatar);
    if (token) {
      fetch(`/users/${user._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((response) => {
        if (response.status === 201) {
          window.location.reload();
          console.log("Post successfully added");
        } else {
          console.log("Post not successfully added");
        }
      });
    } else {
      console.log("No token!");
    }
  };

  return (
    <div id="profile-card">
      <img
        className="cover-photo"
        src="https://images.unsplash.com/photo-1547626740-02cb6aed9ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />
      <div className="details">
        {user &&
          (user.photo ? (
            <Avatar size={300} user={user} />
          ) : (
            <>
              <div className="fallback-avatar">
                {user?.username[0].toUpperCase() || ""}
              </div>
              <h3>{user.username}</h3>
            </>
          ))}

        <input
          type="file"
          class="d-none"
          id="newAvatarInput"
          aria-hidden="true"
          ref={inputRef}
          onChange={handleAvatarChange}
        />
        <i
          className="fa fa-pencil-square-o fa-2x"
          onClick={() => inputRef.current.click()}
          aria-hidden="true"
        ></i>
        <h3>photos</h3>
        <div className="photo-images">
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
          <img src="https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
