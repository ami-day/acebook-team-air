import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center p-4">
      <form id="signup-form" className="rounded-4 p-3" onSubmit={handleSubmit}>
        <h1 className="text-center">Signup</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            autoComplete="off"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            id="submit"
            className="btn btn-success mb-2 px-5"
          >
            Signup
          </button>
          <p>
            Already signed up? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
