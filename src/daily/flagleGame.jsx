import React from "react";

import { Button } from "react-bootstrap";
import { GameEvent, GameNotifier } from "./gameNotifier";
import { delay } from "./delay";

export function FlagleGame(props) {
  const userName = props.userName;
  const [allowPlayer, setAllowPlayer] = React.useState(true);
  const [guessCount, setGuessCount] = React.useState(0);
  const [secretFlag] = React.useState("france");
  const [input, setInput] = React.useState("");
  const firstRow = (
    <>
      <div className="col"></div>
      <div className="col">Your Guess</div>
      <div className="col">Result</div>
    </>
  );
  const [rows, setRows] = React.useState([]);
  const countries = {
    france: {
      name: "France",
      stripes: ["blue", "white", "red"],
    },
    nigeria: {
      name: "Nigeria",
      stripes: ["green", "white", "green"],
    },
    peru: {
      name: "Peru",
      stripes: ["red", "white", "red"],
    },
  };

  async function onPressed(input) {
    if (allowPlayer) {
      setAllowPlayer(false);
      const row = returnRow(input);

      await delay(1000);
      return row;
    }
  }

  function checkGuess(guess) {
    const guessFlag = countries[guess].stripes;
    const trueFlag = countries[secretFlag].stripes;
    const output = [];

    for (let i = 0; i < 3; i++) {
      if (guessFlag[i] === trueFlag[i]) {
        output.push(guessFlag[i]);
      } else {
        output.push("grey");
      }
    }

    const correct = guess === secretFlag;
    return { correct, output };
  }

  function drawFlag(colors) {
    return (
      <svg viewBox="0 0 300 200" width="150" height="100">
        <rect x="0" y="0" width="100" height="200" fill={colors[0]} />
        <rect x="100" y="0" width="100" height="200" fill={colors[1]} />
        <rect x="200" y="0" width="100" height="200" fill={colors[2]} />
      </svg>
    );
  }

  function makeGuess(guess) {
    guess = guess.toLowerCase();
    localStorage.setItem("lastGuess", guess);
    setInput("");
    const { correct, output } = checkGuess(guess);
    const feedbackFlag = drawFlag(output);
    const guessFlag = drawFlag(countries[guess].stripes);
    if (correct) {
      saveStats(guessCount + 1);
    }
    setGuessCount(guessCount + 1);

    const newRow = (
      <>
        <div className="col">
          {guess.charAt(0).toUpperCase() + guess.slice(1)}
        </div>
        <div className="col">{guessFlag}</div>
        <div className="col">{feedbackFlag}</div>
      </>
    );

    if (rows.length === 0) {
      GameNotifier.broadcastEvent(userName, GameEvent.Dstart, {});
      setRows([firstRow, newRow]);
    } else {
      setRows([rows[0], newRow, ...rows.slice(1)]);
    }

    setAllowPlayer(true);
  }

  /// Stats Saving ///
  async function saveStats(guess_count) {
    // Name, Country, Daily Streak, Games Played

    const getDayValue = (date) =>
      Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

    const lastDayValue = Number(localStorage.getItem("lastDayPlayed") || 0);
    const todayValue = getDayValue(new Date());

    if (lastDayValue != 0) {
      if (todayValue === lastDayValue + 1) {
        // Increment Streak, played yesterday
        localStorage.setItem(
          `${userName}dailyStreak`,
          Number(localStorage.getItem(`${userName}dailyStreak`) || 0) + 1,
        );
      } else if (todayValue > lastDayValue + 1) {
        // Reset Streak, missed a day
        localStorage.setItem(`${userName}dailyStreak`, 1);
      }
    } else {
      localStorage.setItem(`${userName}dailyStreak`, 1);
    }

    localStorage.setItem("lastDayPlayed", todayValue);

    const dailyStreak = Number(
      localStorage.getItem(`${userName}dailyStreak`) || 1,
    );

    const newScore = {
      name: userName,
      country: "USA",
      dailyStreak: dailyStreak,
      gamesPlayed: 1,
      score: guess_count,
    };

    // Let other players know the game has concluded
    GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    updateScoresLocal(newScore);
  }

  /// Local Score Keeping ///
  function updateScoresLocal(newScore) {
    const scoresText = localStorage.getItem("scores");
    let scores = [];
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    const existingIndex = scores.findIndex((s) => s.name === newScore.name);

    if (existingIndex !== -1) {
      const newGamesPlayed = scores[existingIndex].gamesPlayed + 1;
      newScore.gamesPlayed = newGamesPlayed;
      scores[existingIndex] = newScore;
    } else {
      let found = false;
      for (const [i, prevScore] of scores.entries()) {
        if (newScore.gamesPlayed > prevScore.gamesPlayed) {
          scores.splice(i, 0, newScore);
          found = true;
          break;
        }
      }

      if (!found) {
        scores.push(newScore);
      }

      if (scores.length > 10) {
        scores.length = 10;
      }
    }
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  /// return statement ///
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a flag..."
          aria-label="Enter a flag..."
          onChange={(e) => setInput(e.target.value)}
          list="country-options"
          autoComplete="off"
          value={input}
        />
        <datalist id="country-options">
          {Object.keys(countries).map((key) => (
            <option key={key}>{countries[key].name}</option>
          ))}
        </datalist>
        <Button variant="primary" onClick={() => makeGuess(input)}>
          Submit
        </Button>
      </div>

      <div className="container text-center">
        <div className="row row-cols-3">{rows}</div>
      </div>
    </>
  );
}
