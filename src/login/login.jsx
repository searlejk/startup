import React from "react";
import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <main>
      <form method="get" action="daily.html">
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
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
        <span className="text-muted">
          Need an account?{" "}
          <NavLink to="create_account">Create Account</NavLink>{" "}
        </span>
      </form>
    </main>
  );
}
