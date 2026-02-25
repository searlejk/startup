import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

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
      <h1>Log In</h1>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <NavLink to="daily" className="btn btn-primary">
        Log In
      </NavLink>
      <span className="small-text">
        Need an account?{" "}
        <NavLink to="create_account">Create Account</NavLink>{" "}
      </span>
    </>
  );
}
