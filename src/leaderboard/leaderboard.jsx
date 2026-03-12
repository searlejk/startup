import React from "react";
import "./leaderboard.css";

export function Leaderboard() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/scores")
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
      });
  }, []);

  const communityCount = scores.reduce(
    (total, score) => total + (score.gamesPlayed || 0),
    0,
  );

  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{(score.name || "Anonymous").split("@")[0]}</td>
          <td>
            <img src={score.countryURL} height="30" alt={score.country} />
          </td>
          <td>{score.dailyStreak || 0}</td>
          <td>{score.gamesPlayed || 0}</td>
        </tr>,
      );
    }
  } else {
    scoreRows.push(
      <tr key="0">
        <td colSpan="5">Be the first to score</td>
      </tr>,
    );
  }

  return (
    <main>
      <div className="flag_banner">
        <img src="flag_banner.png" alt="flag banner image" />
      </div>
      <h1>Community: {communityCount} games played</h1>
      <table className="table table-dark table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Daily Streak</th>
            <th>Games Played</th>
          </tr>
        </thead>
        <tbody id="scores">{scoreRows}</tbody>
      </table>
    </main>
  );
}
