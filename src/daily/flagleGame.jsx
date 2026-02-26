import React from "react";

import { Button } from "react-bootstrap";
import { GameEvent, GameNotifier } from "./gameNotifier";

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

    setGuessCount(guessCount + 1);
    setAllowPlayer(true);
  }

  async function saveStats(guess_count) {
    localStorage.setItem(
      "gamesPlayed",
      Number(localStorage.getItem("gamesPlayed") || 0) + 1,
    );
    const games_played = localStorage.getItem("gamesPlayed") || 0;
    const date = new Date().toLocaleDateString();
    const newStats = {
      name: userName,
      score: guess_count,
      date: date,
      gamesPlayed: games_played,
    };

    // Let other players know the game has concluded
    GameNotifier.broadcastEvent(userName, GameEvent.End, newStats);

    updateScoresLocal(newStats);
  }

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
            <option>{countries[key].name}</option>
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
