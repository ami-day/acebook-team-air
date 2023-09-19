import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";
import Navbar from "../navbar/navbar";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <Navbar onLogout={logout} />
        <main>
          <div>
            <PostForm token={token}></PostForm>
          </div>
          <div>
            <h2>Posts</h2>
            <div id="feed" role="feed">
              {posts.map((post) => (
                <Post post={post} key={post._id} />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
