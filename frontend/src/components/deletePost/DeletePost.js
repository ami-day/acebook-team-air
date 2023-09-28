import React from "react";

const DeletePost = ({ postId, token, setPosts }) => {
  const handleDeletePostClick = () => {
    fetch(`/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("post deleted successfully");
          setPosts((delPosts) => {
            return delPosts.filter((post) => post._id !== postId);

        })
        }
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return (
    <i className="fa fa-trash-o" aria-hidden="true" onClick={handleDeletePostClick}></i>
  );
};

export default DeletePost;