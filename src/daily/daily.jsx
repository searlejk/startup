import React from "react";

export function Daily() {
  return (
    <div className="body bg-dark text-light">
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

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a flag..."
            aria-label="Enter a flag..."
            aria-describedby="button-addon2"
          />
          <button className="btn btn-primary" type="button" id="button-addon2">
            Submit
          </button>
        </div>

        <div className="container text-center">
          <div className="row row-cols-3">
            <div className="col"></div>
            <div className="col">Your Guess</div>
            <div className="col">Result</div>

            <div className="col">
              Guess #3
              <br />
              (france)
              <br />
              Correct!
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="blue" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="red" />
              </svg>
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="blue" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="red" />
              </svg>
            </div>

            <div className="col">
              Guess #2
              <br />
              (Peru)
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="red" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="red" />
              </svg>
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="grey" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="red" />
              </svg>
            </div>

            <div className="col">
              Guess #1
              <br />
              (Nigeria)
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="green" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="green" />
              </svg>
            </div>
            <div className="col">
              <svg viewBox="0 0 300 200" width="150" height="100">
                <rect x="0" y="0" width="100" height="200" fill="grey" />
                <rect x="100" y="0" width="100" height="200" fill="white" />
                <rect x="200" y="0" width="100" height="200" fill="grey" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
