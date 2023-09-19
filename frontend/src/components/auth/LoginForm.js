import React, { useState } from "react";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("yay");
      navigate("/login");
    } else {
      console.log("oop");
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

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <form
        className="container col-3 login-form rounded-4 p-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h1 className="text-center">Login</h1>
          <label for="exampleInputEmail1" className="form-label">
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
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" id="submit" className="btn btn-primary w-50">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
