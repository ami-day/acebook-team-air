import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";
import Navbar from "../navbar/navbar";
import "./Feed.css";
import FriendsCard from "../FriendsCard/FriendsCard";
import ProfileCard from "../profile/ProfileCard";
import FriendsModal from "./FriendsModal";


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [modal, setModal] = useState(false);

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
        {modal && <FriendsModal setModal={setModal}></FriendsModal>}
        <main className={`${modal && "blur"}`} style={{display: "flex", gap: "20px"}}>
          <div style={{flex: 1}}>
          <ProfileCard></ProfileCard>
          </div>
        <div style={{flex: 1}}>
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
          </div>
          <div style={{flex: 1}}>
            <FriendsCard setModal={setModal}></FriendsCard>
          </div>
        </main>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
