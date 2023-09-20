import React, { useState } from "react";
import Comment from "../comment/Comment";

const Post = ({ post, token }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

const postedAt = new Date(post.createdAt);
const formattedDate = `${postedAt.toDateString()} -
  ${String(postedAt.getHours().toPrecision().padStart(2,'0'))}:${String(postedAt.getMinutes().toPrecision().padStart(2,'0'))}`


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault();
    // make post request to create new comment
    // ensure postid is sent along with the comment content
    const data = {
      postId: post._id,
      content: newComment,
    };

    if (token) {
      fetch("/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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
    <article data-cy="post" key={post._id}>
      <div>{post.message}</div>
      <div>posted by: {post.user?.username}</div>
      <div>{formattedDate}</div>
      <div>
        {post.comments.length ? (
          <div className="comments">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
        ) : (
          <p>No comments</p>
        )}
      </div>

      {showCommentBox && (
        <>
          <textarea
            className="form-control mb-3"
            id="new-comment"
            rows="3"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Leave a comment here..."
          ></textarea>
          <button
            onClick={submitComment}
            className="btn btn-info btn-sm px-4 mb-3"
          >
            Post comment
          </button>
        </>
      )}
      <button
        onClick={() => {
          setShowCommentBox(!showCommentBox);
        }}
        className={`btn btn-sm px-4 ${
          showCommentBox ? "btn-danger" : "btn-info"
        }`}
      >
        {showCommentBox ? "Close" : "Leave a comment"}
      </button>
    </article>
  );
};

export default Post;
