import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LoginForm.css';
const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [hide, setHide] = useState(true);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    
    if (response.status !== 201) {
      let data = await response.json()
      setErrorMessage(data.message)
      //navigate("/login");
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const hideHandler = () => {
    if(hide == true) {
      setHide(false);
    } else {
      setHide(true);
    }
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center p-4">
      <form
        id="login-form"
        className="rounded-4 py-3 px-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h1 className="text-center">Login</h1>
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
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={hide ? "password" : "text"}
            placeholder="Password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <i id="hide-icon" class="fa fa-eye-slash" onClick={hideHandler}></i>
        <p className="error">{errorMessage}</p>
        <div className="text-center">
          <button
            type="submit"
            id="submit"
            className="btn btn-success mb-2 px-5"
          >
            Login
          </button>
          <p>
            No account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
