import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";
import Navbar from "../navbar/navbar";
import "./Feed.css";

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
          console.log(data.posts);
          sortDates(data.posts);
          setPosts(data.posts);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const sortDates = (array) => {
    array.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <Navbar onLogout={logout} token={token} />
        <main>
          <div className="mb-5">
            <PostForm token={token}></PostForm>
          </div>
          <div>
            <h2 style={{ color: "aliceblue" }} className="text-center">
              Posts
            </h2>
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
