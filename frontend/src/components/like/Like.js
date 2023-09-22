import React, { useState } from "react";
import "../like/like.css";

const Like = ({ likeCount, post, token}) => {

  return (
    <div>
    <p className="likes">👍 {likeCount} </p>
  </div>
);
}
  
export default Like;