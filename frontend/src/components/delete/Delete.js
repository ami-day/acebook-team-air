import React from "react";

const Delete = ({ commentId, token, setPosts }) => {
  const handleDeleteClick = () => {
    fetch(`/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Comment deleted successfully");
          setPosts((previousPosts) => {
            return previousPosts.map((post) => {
              const filterdCommentArray = post.comments.filter((comment) => {
                return comment._id !== commentId;
              });
              post.comments = filterdCommentArray;
              return post;
            });
          });
        } else {
          console.error("Error deleting comment");
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <i
      className="fa fa-trash-o"
      aria-hidden="true"
      onClick={handleDeleteClick}
    ></i>
  );
};

export default Delete;
