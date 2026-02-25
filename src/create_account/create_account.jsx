import React from "react";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function CreateAccount(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function createUser() {
    if (password !== confirmPassword) {
      setDisplayError("Passwords do not match");
      return;
    }
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  return (
    <>
      <h1>Create Account</h1>
      <div className="form-floating">
        <input
          className="form-control"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="your@email.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="password"
        />
        <label for="floatingPassword">Confirm Password</label>
      </div>
      <Button
        variant="primary"
        onClick={() => createUser()}
        disabled={!userName || !password || password !== confirmPassword}
      >
        Create Account
      </Button>
      <span className="small-text">
        Have an account?{" "}
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Log In
        </Button>
      </span>
    </>
  );
}
