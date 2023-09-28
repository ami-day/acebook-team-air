import React, { useState } from "react";
import { Link } from "react-router-dom";
const Filter = require('bad-words');

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const filter = new Filter();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (filter.isProfane(username)) {
      setErrorMessage("Username contains profanity. Please choose a different username.");
      return;
    }
    if(!passwordValiding(password)){
      setErrorMessage("Password not valid. Password must include an uppercase and lowercase character, a special character (@$!%*?&) and be a minimum of 8 characters")
    }else if(password != confirmPassword){
      setErrorMessage("Passwords do not match")
    }
    else{
      fetch("/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, username: username, photo: photo }),
      }).then((response) => {
        if (response.status === 201) {
          navigate("/login");
        } else {
          return response.json()
        }
      }).then( (data) => {
        setErrorMessage(data.message)
      }
      )
    };}
    
  
  


  const passwordValiding = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) {
      return true
    } else {
      return false
    }
  }
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  
  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };  

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };   

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center p-4">
      <form id="signup-form" className="rounded-4 p-3" onSubmit={handleSubmit}>
        <h1 className="text-center">Signup</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleNameChange}
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            photoURL
          </label>
          <input
            type="text"
            className="form-control"
            id="photo"
            value={photo}
            onChange={handlePhotoChange}
            placeholder="photoURL"
            autoComplete="off"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter Password"
            className="form-control"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <p className='error'>{errorMessage}</p>
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
