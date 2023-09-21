import React, { useRef, useState } from "react";
import Comment from "../comment/Comment";
import Like from "../like/Like";
import "./Post.css";

const Post = ({ post, token }) => {
  const commentBox = useRef();
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  const postedAt = new Date(post.createdAt);
  const formattedDate = `${postedAt.toDateString()} -
  ${String(postedAt.getHours().toPrecision().padStart(2, "0"))}:${String(
    postedAt.getMinutes().toPrecision().padStart(2, "0")
  )}`;

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleLikeClick = () => {
    setLikes(likes + 1);
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
    <article className="post" data-cy="post" key={post._id}>
      <div className="post-header">
        <img class="avatar" src={post.user?.photo} />
        <div>
          <p className="username">{post.user.username}</p>
          <p className="datetime">{formattedDate}</p>
        </div>
      </div>
      <p>{post.message}</p>
      {post.photo && <img className="post-img" src={`/${post.photo}`} />}
      <Like likes={likes} />
      <div className="post-buttons">
        <button onClick={handleLikeClick} className="btn btn-primary">
          Like
        </button>
        <button
          onClick={() => {
            commentBox.current.focus();
          }}
          className="btn btn-primary"
        >
          Comment
        </button>
      </div>
      <div className="comments">
        {post.comments.length ? (
          post.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} post={post} />
          ))
        ) : (
          <p className="text-center">Be the first to leave a comment</p>
        )}
      </div>

      <textarea
        className="form-control"
        id="new-comment"
        ref={commentBox}
        rows="3"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Leave a comment here..."
      />
      <button onClick={submitComment} className="btn btn-primary">
        Post comment
      </button>
    </article>
  );
};

export default Post;
