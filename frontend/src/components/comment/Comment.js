import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <h3>User who made comment</h3>
      <p>{comment.content}</p>
    </div>
  );
};
export default Comment;
