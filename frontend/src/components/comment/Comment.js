import React, { useState, useEffect, useRef } from "react";
import Like from "../like/Like";
import "./comments.css";
import Delete from "../delete/Delete";
import Avatar from "../user/Avatar";
const Filter = require("bad-words");
const filter = new Filter();

const Comment = ({ comment, post, token, user, setPosts }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const commentRef = useRef();

  //filters rude words and replaces them with *
  const ReplaceRudeWords = (comment) => {
    return filter.clean(comment);
  };

  // Get all data
  useEffect(() => {
    if (token) {
      fetch(`/likes?commentId=${comment._id}`, {
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

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (token) {
      const likeData = {
        userId: user._id,
        commentId: comment._id,
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

  // Update comment handler functions
  const handleCommentChange = (e) => {
    setEditedComment(e.target.textContent);
  };

  const handleEdit = () => {
    commentRef.current.focus({ focusVisible: true });
    if (editMode && editedComment !== comment.content) {
      console.log("now make patch request", editedComment, comment.content);
      console.log("we will send it with this data", editedComment);
    
      //make fetch to update db
      fetch(`/comments/${comment._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editedComment }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Comment update successful.");
            return response.json();
          } else {
            console.log("Comment update unsuccessful.");
          }
        })
        .then((data) => {
          console.log("data:", data)
          console.log("data comment", data.comment.content);
          setEditedComment(data.comment.content);
          setEditMode(!editMode);
          // window.location.reload();
        });

    } else {
      setEditMode(!editMode);
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleString("en-gb", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="comment">
      <Avatar size={35} user={comment.user} />
      <div>
        <div className="details">
          <p className="username">{comment.user.username}</p>
          {/* Update comment & toggle edit button display */}
          <p onInput={handleCommentChange} contentEditable={`${editMode}`} ref={commentRef} tabIndex="0">
            {ReplaceRudeWords(comment.content)}
          </p>
          <div className="comment-buttons">
          {editMode ? <i onClick={handleEdit} className="edit-icon fa fa-floppy-o" aria-hidden="true"></i> : <i onClick={handleEdit} className="edit-icon fa fa-pencil" aria-hidden="true"></i>}
          <Delete commentId={comment._id} token={token} setPosts={setPosts} />
          </div>
        </div>
        <div className="info">
          <p>{formattedDate}</p>
          <p onClick={handleLikeClick} className="like">
            {liked ? "Unlike" : "Like"}
          </p>
          <Like likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
