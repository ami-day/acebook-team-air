import React from "react";
import './comments.css';

const Comment = ({ comment, post }) => {
  return (
    <div id="photo-div">
      <p id="para"><strong>Author: </strong>{comment.user?.username}</p>
      <img id="profilephoto2" src={post.user?.photo}/>
      <p id="comment"><strong>Comment: </strong>{comment.content}</p>
    </div>
  );
};
export default Comment;
