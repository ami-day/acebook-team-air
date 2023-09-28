import React from "react";

const Delete = ({ commentId, token, setPosts }) => {

    
  const handleDeleteClick = () => {
    fetch(`/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Comment deleted successfully');
          setPosts((previousPosts) => {
            return previousPosts.map((post) => {
               const filterdCommentArray = post.comments.filter((comment) => {
                    return (comment._id !== commentId)
                })
                post.comments = filterdCommentArray
                console.log(filterdCommentArray)
                return post
             })

          })
        } else {
          console.error('Error deleting comment');
        }
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleDeleteClick}
    >
      Delete
    </button>
  );
};

export default Delete;