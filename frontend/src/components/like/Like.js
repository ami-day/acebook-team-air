import React, { useState } from "react";
import "../like/like.css";

const Like = ({ likes }) => {
  return (
    <div>
      <p className="likes">👍 {likes} </p>
    </div>
  );
};

export default Like;
