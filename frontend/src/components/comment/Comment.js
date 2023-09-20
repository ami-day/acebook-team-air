import React from "react";
import '../post/Post.css';

const Comment = ({ comment, post }) => {
  return (
    <div>
      <p><strong>Author: </strong>{comment.user?.username}</p>
      <img id="profilephoto" src={post.user?.photo}/>
      <p><strong>Comment: </strong>{comment.content}</p>
    </div>
  );
};
export default Comment;
