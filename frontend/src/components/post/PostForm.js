import React, { useState } from "react";

const PostForm = ({ token }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    if (token) {
      fetch("/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message }),
      }).then((response) => {
        if (response.status === 201) {
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
      className="container col-3 login-form rounded-4 p-3"
      onSubmit={handleSubmitPost}
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
        <button
          onClick={handleSubmitPost}
          type="submit"
          id="submit"
          className="btn btn-success px-5"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
