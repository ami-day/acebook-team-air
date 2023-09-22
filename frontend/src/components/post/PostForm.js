import "./PostForm.css";
import React, { useState } from "react";
import "./PostForm.css";

const PostForm = ({ token }) => {
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(() => event.target.files[0]);
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("message", message);
    if (token) {
      fetch("/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    <form
      id="post-form"
      className="rounded-4 p-3 mx-auto"
      onSubmit={handleSubmitPost}
      encType="multipart/form-data"
    >
      <div className="mb-3">
        <h2 className="text-center">Create New Post</h2>
        <textarea
          className="form-control"
          id="message"
          rows="3"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message here..."
        ></textarea>
      </div>
      <div className="d-flex justify-content-center">
        <div className="input-group">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handlePhotoChange}
            className="photo-upload form-control"
            id="photo-upload-input"
            aria-describedby="photo-upload-input"
            aria-label="post"
          />
          <button
            className="btn btn-primary"
            type="button"
            id="photo-upload-button"
            onClick={handleSubmitPost}
          >
            Post
          </button>
        </div>
        {/* <button
          onClick={handleSubmitPost}
          type="submit"
          id="submit"
          className="btn btn-primary px-5"
        >
          Post
        </button> */}
      </div>
    </form>
  );
};

export default PostForm;
