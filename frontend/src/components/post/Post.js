import React from "react";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      {post.message}
      {post.comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </article>
  );
};

export default Post;
