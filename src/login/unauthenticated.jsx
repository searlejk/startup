import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";
import { useNavigate } from "react-router-dom";
import BaseComponent from "bootstrap/js/dist/base-component";

export function Unauthenticated(props) {
  const [mode, setMode] = React.useState("login");
  const [country, setCountry] = React.useState("au");
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate("/api/auth/login");
    // localStorage.setItem("userName", userName);
    // props.onLogin(userName);
  }

  async function createUser() {
    loginOrCreate("/api/auth/create");
    // localStorage.setItem("userName", userName);
    // props.onLogin(userName);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
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
      {mode === "create" && (
        <div className="form-floating">
          <input
            className="form-control"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country code (e.g. us, au)"
          />
          <label>Country</label>
        </div>
      )}

      {mode === "login" && (
        <Button
          variant="primary"
          onClick={() => loginUser()}
          disabled={!userName || !password}
        >
          Log In
        </Button>
      )}

      {/* show create button only in create mode */}
      {mode === "create" && (
        <Button
          variant="primary"
          onClick={() => createUser()}
          disabled={!userName || !password || !country}
        >
          Create
        </Button>
      )}
      {mode === "login" && (
        <p>
          Need an account?{" "}
          <a href="#" onClick={() => setMode("create")}>
            Create Account
          </a>
        </p>
      )}
      {mode === "create" && (
        <p>
          Have an account?{" "}
          <a href="#" onClick={() => setMode("login")}>
            Log In
          </a>
        </p>
      )}

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
