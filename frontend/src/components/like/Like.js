import React, { useState } from "react";
import "../like/like.css";



const Like = ({ likes, post, token}) => {

  const data = {
    userId: post.user?.username,
    postId: post._id,
  };
  const likeHandler = () => {
    if (token) {
      fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 201) {
          window.location.reload();
          console.log("like successfully added");
        } else {
          console.log("like not successfully added");
        }
      });
    } else {
      console.log("No token!");
    }
  }


  return (
    <div>
    <p className="likes">👍 {likes} </p>
    <button className="btn btn-primary" onClick={likeHandler}>like</button>
  </div>
);
}
  
export default Like;