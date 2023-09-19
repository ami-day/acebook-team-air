import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <h5>{comment.user?.email}</h5>
      <p>{comment.content}</p>
    </div>
  );
};
export default Comment;
