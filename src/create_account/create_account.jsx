import React from "react";
import { NavLink } from "react-router-dom";

export function CreateAccount() {
  return (
    <main>
      <form method="get" action="daily.html">
        <h1>Create Account</h1>
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
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingVerifyPassword"
            placeholder="Verify Password"
          />
          <label for="floatingVerifyPassword">Verify Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
        <span className="text-muted">
          Need an account? <NavLink to="/">Log In</NavLink>{" "}
        </span>
      </form>
    </main>
  );
}
