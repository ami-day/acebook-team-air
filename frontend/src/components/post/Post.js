import React, { useRef, useState, useEffect } from "react";
import Comment from "../comment/Comment";
import Like from "../like/Like";
import "./Post.css";
import Avatar from "../user/Avatar";
import EditPostModal from "./EditPostModal";
import DeletePost from "../deletePost/DeletePost";
const Filter = require("bad-words");
const filter = new Filter();

const Post = ({ post, token, user, setPosts }) => {
  const commentBox = useRef();
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState(post.message || "");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  //filters rude words and replaces them with *
  const ReplaceRudeWords = (dirtyPost) => {
    if (dirtyPost) {
      return filter.clean(dirtyPost);
    }
  };

  useEffect(() => {
    if (token) {
      fetch(`/likes?postId=${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setLikeCount(data.likes.length);
          // filter by signed-in user
          const filteredLikes = data.likes.filter((like) => {
            return like.userId === user._id;
          });
          if (filteredLikes.length > 0) {
            setLiked(true);
          }
        });
    }
  }, [likeCount]);

  const formattedDate = new Date(post.createdAt).toLocaleString("en-gb", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (token) {
      const likeData = {
        userId: user._id,
        postId: post._id,
      };
      // handle change of route
      let method = "POST";
      if (liked) {
        method = "DELETE";
      }
      fetch("/likes", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(likeData),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("like successfully added");
            return response.json();
          } else {
            console.log("like not successfully added");
          }
        })
        .then((data) => {
          setLikeCount(data.likes.length);
          const filteredLikes = data.likes.filter((like) => {
            return like.userId === user._id;
          });
          if (filteredLikes.length > 0) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        });
    } else {
      console.log("No token!");
    }
  };

  const submitComment = (event) => {
    event.preventDefault();
    if (newComment === "") {
      // no comment provided
      setErrorMessage("Comment cannot be empty");
      return;
    }
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
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("Comment successfully added");
            return response.json();
          } else {
            console.log("Comment not successfully added");
          }
        })
        .then((data) => {
          // add created comment to posts array
          setPosts((prev) => {
            return prev.map((prevPost) => {
              if (prevPost._id === post._id) {
                prevPost.comments.push(data.comment);
              }
              return prevPost;
            });
          });
          setNewComment("");
        });
    } else {
      console.log("No token!");
    }
  };

  return (
    <article className="post" data-cy="post" key={post._id}>
      <div className="post-header">
        <Avatar size={50} user={post.user} />
        <div>
          <p className="username">{post.user.username}</p>
          <p className="datetime">{formattedDate}</p>
        </div>
      </div>
      <div className="post-icons">
        <i
          onClick={handleShowModal}
          className="edit-icon fa fa-pencil"
          aria-hidden="true"
        />
        <DeletePost postId={post._id} token={token} setPosts={setPosts} />
      </div>
      <p>{ReplaceRudeWords(message)}</p>
      {post.photo && <img className="post-img" src={`/${post.photo}`} />}
      <Like likeCount={likeCount} />
      <div className="post-buttons">
        <button onClick={handleLikeClick} className="btn btn-primary">
          {liked ? (
            <span>
              Unlike
              <i class="fa fa-thumbs-o-down ms-2" aria-hidden="true"></i>
            </span>
          ) : (
            <span>
              Like <i className="fa fa-thumbs-o-up ms-2" aria-hidden="true"></i>
            </span>
          )}
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

      <EditPostModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        post={post}
        token={token}
        setShowModal={setShowModal}
        setMessage={setMessage} // change the message from inside the modal
      />

      <div className="comments">
        {post.comments.length ? (
          post.comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              post={post}
              token={token}
              user={user}
              setPosts={setPosts}
            />
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
        required
      />
      <p className="error">{errorMessage}</p>
      <button onClick={submitComment} className="btn btn-primary">
        Post comment
      </button>
    </article>
  );
};

export default Post;
