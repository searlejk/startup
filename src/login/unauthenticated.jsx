import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";
import { useNavigate } from "react-router-dom";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  return (
    <>
      <h1>Welcome to Flagle</h1>
      <div className="form-floating">
        <input
          className="form-control"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="your@email.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <Button
        variant="primary"
        onClick={() => loginUser()}
        disabled={!userName || !password}
      >
        Log In
      </Button>
      <Button
        variant="secondary"
        onClick={() => createUser()}
        disabled={!userName || !password}
      >
        Create
      </Button>
    </>
  );
}
