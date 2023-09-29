import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";
import Navbar from "../navbar/navbar";
import FriendsCard from "../FriendsCard/FriendsCard";
import ProfileCard from "../profile/ProfileCard";
import FriendsModal from "./FriendsModal";
import "./Feed.css";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [myFriends, setMyFriends] = useState(user?.friends_array || []);

  useEffect(() => {
    if (token) {
      fetch("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            logout();
          }
        })
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUser(data.user);
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            logout();
          }
        })
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

  if (user) {
    return (
      <>
        <Navbar onLogout={logout} token={token} user={user} />
        {modal && (
          <FriendsModal
            setModal={setModal}
            token={token}
            user={user}
            myFriends={myFriends}
            setMyFriends={setMyFriends}
          ></FriendsModal>
        )}
        <main className={`${modal ? "blur" : ""}`} id="feed">
          <div style={{ flex: "0 1 500px" }}>
            <ProfileCard
              user={user}
              setUser={setUser}
              posts={posts}
            ></ProfileCard>
          </div>
          <div style={{ flex: 1 }}>
            <div className="mb-5">
              <PostForm token={token} setPosts={setPosts}></PostForm>
            </div>
            <div>
              <h2 style={{ color: "aliceblue" }} className="text-center">
                {posts.length > 0 ? "Posts" : "No Posts. Be the first 👆"}
              </h2>
              <div id="feed" role="feed" className="container">
                {posts.map((post) => (
                  <Post
                    post={post}
                    key={post._id}
                    token={token}
                    user={user}
                    setPosts={setPosts}
                  />
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: "0 1 500px" }}>
            <FriendsCard
              setModal={setModal}
              token={token}
              user={user}
              myFriends={myFriends}
              setMyFriends={setMyFriends}
            ></FriendsCard>
          </div>
        </main>
      </>
    );
  }
};

export default Feed;
