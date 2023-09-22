import React, { useRef, useState, useEffect} from "react";
import Comment from "../comment/Comment";
import Like from "../like/Like";
import "./Post.css";

const Post = ({ post, token}) => {
  const commentBox = useRef();
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);

useEffect(() => {
  if (token) {
    fetch(`/likes?postId=${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setLikeCount(data.likes.length)
        console.log(data);
      });
  }
}, [likeCount]);



  const postedAt = new Date(post.createdAt);
  const formattedDate = `${postedAt.toDateString()} -
  ${String(postedAt.getHours().toPrecision().padStart(2, "0"))}:${String(
    postedAt.getMinutes().toPrecision().padStart(2, "0")
  )}`;

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const data = {
    userId: post.user?.username,
    postId: post._id,
  };

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (token) {
      console.log(data)
      fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 201) {
          //window.location.reload();
          console.log("like successfully added");
          return response.json()
        } else {
          console.log("like not successfully added");
        }
        }).then((data) => {
          setLikeCount(data.likes.length);
        });
    } else {
      console.log("No token!");
    }
  }

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
        <img className="avatar" src={post.user?.photo} />
        <div>
          <p className="username">{post.user.username}</p>
          <p className="datetime">{formattedDate}</p>
        </div>
      </div>
      <p>{post.message}</p>
      {post.photo && <img className="post-img" src={`/${post.photo}`} />}
      <Like likeCount={likeCount} post={post} token={token}/>
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
