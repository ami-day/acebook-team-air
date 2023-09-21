import React, { useState } from "react";
import "../like/like.css"

const Like = () => {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <div>
      <p className="symbol">  👍🏼{likes} </p>
      <button onClick={handleLikeClick} className="like-button btn btn-primary">
        Like
      </button>
    </div>
  );
};



export default Like;