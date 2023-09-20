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
          console.log(data.posts);
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
          <div className="mb-5">
            <PostForm token={token}></PostForm>
          </div>
          <div>
            <h2 className="text-center">Posts</h2>
            <div id="feed" role="feed" className="container">
              {posts.map((post) => (
                <Post post={post} key={post._id} token={token} />
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
