import React from "react";

export function Login() {
  return (
    <div className="body bg-dark text-light">
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
            <a href="create_account.html">Create Account</a>{" "}
          </span>
        </form>
      </main>
    </div>
  );
}
