import "./App.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Profile from "../profile/Profile";
import React, { useState, useEffect } from "react";
import Feed from "../feed/Feed";
import {
  useNavigate,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setUser(data.user);
        });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/posts"
        element={<Feed navigate={useNavigate()} user={user} />}
      />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route
        path="/profile"
        element={<Profile navigate={useNavigate()} user={user} />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
