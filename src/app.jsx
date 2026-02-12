import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

// import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
// import { Login } from "./login/login";
// import { Play } from "./play/play";
// import { Scores } from "./scores/scores";
// import { About } from "./about/about";

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header>
        <nav>
          <ul>
            <li>
              <h3>Flagle</h3>
            </li>

            <li className="curr_page">
              <a href="login.html">Home</a>
            </li>
            <li>
              <a href="daily.html">Daily</a>
            </li>
            <li>
              <a href="unlimited.html">Unlimited</a>
            </li>
            <li>
              <a href="leaderboard.html">Leaderboard</a>
            </li>
          </ul>
        </nav>
      </header>

      <main> Main Body Section</main>

      <footer>
        <a href="https://github.com/searlejk/startup">Author: Jeremy Searle</a>
      </footer>
    </div>
  );
}

// function NotFound() {
//   return (
//     <div className="container">
//       <h1>404 Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//     </div>
//   );
// }
