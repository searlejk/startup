import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./authenticated.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    props.onLogout();
  }

  return (
    <>
      <h1>Welcome to Flagle</h1>
      <div className="form-floating">
        <Button variant="primary" onClick={() => navigate("/daily")}>
          Daily
        </Button>
        <Button variant="primary" onClick={() => navigate("/unlimited")}>
          Unlimited
        </Button>
        <Button variant="primary" onClick={logout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
