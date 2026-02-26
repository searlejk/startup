import React from "react";

import { FlagleGame } from "./flagleGame";

export function Daily(props) {
  return (
    <main>
      <div className="flag_banner">
        <img src="flag_banner.png" alt="flag banner image" />
      </div>

      <div className="collapse_menu">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="collapse"
          data-bs-target="#notificationCollapse"
          aria-expanded="false"
          aria-controls="notificationCollapse"
        >
          Notifications <span className="badge text-bg-secondary">4</span>
        </button>

        <div className="collapse" id="notificationCollapse">
          <div className="card card-body">
            <ul id="notification_daily" className="list-group">
              <li className="list-group-item">Joe started a new game</li>
              <li className="list-group-item">Moe started a new game</li>
              <li className="list-group-item">Mike started a new game</li>
              <li className="list-group-item">
                Carly got the daily flag in 7 attempts
              </li>
              <li className="list-group-item">
                Moe got the daily flag in 3 attempts
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FlagleGame userName={props.userName} />
    </main>
  );
}
