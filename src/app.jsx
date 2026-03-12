import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./login/login";
import { Daily } from "./daily/daily";
import { Leaderboard } from "./leaderboard/leaderboard";
import { Unlimited } from "./unlimited/unlimited";
import { AuthState } from "./login/authState";

export default function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || "",
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const isAuthed = authState === AuthState.Authenticated;

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <nav>
            <ul>
              <li>
                <h3>Flagle</h3>
              </li>

              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                {isAuthed ? (
                  <NavLink to="daily">Daily</NavLink>
                ) : (
                  <span className="nav-disabled">Daily</span>
                )}
              </li>
              <li>
                {isAuthed ? (
                  <NavLink to="unlimited">Unlimited</NavLink>
                ) : (
                  <span className="nav-disabled">Unlimited</span>
                )}
              </li>
              <li>
                {isAuthed ? (
                  <NavLink to="leaderboard">Leaderboard</NavLink>
                ) : (
                  <span className="nav-disabled">Leaderboard</span>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />
          <Route
            path="/daily"
            element={
              isAuthed ? (
                <Daily userName={userName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/unlimited"
            element={
              isAuthed ? (
                <Unlimited userName={userName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/leaderboard"
            element={isAuthed ? <Leaderboard /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <a href="https://github.com/searlejk/startup">
            Author: Jeremy Searle
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="container">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
