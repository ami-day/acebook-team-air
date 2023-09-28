import "./EditPostModal.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useState } from "react";
import "../post/Post";

const EditPostModal = ({
  token,
  post,
  setShowModal,
  handleClose,
  showModal,
  setMessage,
}) => {
  const [newMessage, setNewMessage] = useState(post.message);

  // Update post handler
  const handlePostUpdate = () => {
    if (token) {


      fetch(`/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({message: newMessage}), // Format as an object otherwise it will break
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Post update successful.");
            return response.json();
          } else {
            console.log("Post update unsuccessful.");
          }
        })
        .then((data) => {
          // Update message in post component (triggered by state change)
          setMessage(data.post.message);
          // Close the Edit Post modal after updating post
          setShowModal(false); 
        });
    }
  };  

  if (!showModal) {
    return null;
  }

  return (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h5>Edit Post</h5>
          <button className="close-button" onClick={handleClose}>
            x
          </button>
        </div>
        <div className="custom-modal-body">
          <textarea  // handles text input
            className="form-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="custom-modal-footer">
          <button className="save-changes-button" onClick={handlePostUpdate}>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
