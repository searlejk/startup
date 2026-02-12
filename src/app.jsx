import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Daily } from "./daily/daily";
import { CreateAccount } from "./create_account/create_account";
import { Leaderboard } from "./leaderboard/leaderboard";
import { Unlimited } from "./unlimited/unlimited";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <nav>
            <ul>
              <li>
                <h3>Flagle</h3>
              </li>

              <li className="curr_page">
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="daily">Daily</NavLink>
              </li>
              <li>
                <NavLink to="unlimited">Unlimited</NavLink>
              </li>
              <li>
                <NavLink to="leaderboard">Leaderboard</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/unlimited" element={<Unlimited />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create_account" element={<CreateAccount />} />
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
