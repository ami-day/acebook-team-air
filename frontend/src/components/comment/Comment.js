import React from "react";
import "./comments.css";

const Comment = ({ comment, post }) => {
  // const today = new Date();
  // const postedDate = new Date(comment.createdAt);
  // let timeDiff = today - postedDate;
  // timeDiff = (timeDiff.toFixed() / (1000 * 60)).toPrecision(1);
  const postedAt = new Date(comment.createdAt);
  const formattedDate = `${postedAt.toDateString()} 
  ${String(postedAt.getHours().toPrecision().padStart(2, "0"))}:${String(
    postedAt.getMinutes().toPrecision().padStart(2, "0")
  )}`;

  return (
    <div className="comment">
      <img className="avatar" src={post.user?.photo} />
      <div>
        <div className="details">
          <p className="username">{comment.user.username}</p>
          <p>{comment.content}</p>
        </div>
        <div className="info">
          <p>{formattedDate}</p>
          <p className="like">Like</p>
        </div>
      </div>
    </div>
  );
};
export default Comment;
