import React from "react";

import { Button } from "react-bootstrap";
import { GameEvent, GameNotifier } from "./gameNotifier";
import { delay } from "./delay";
import "./daily.css";

export function FlagleGame(props) {
  const userName = props.userName;
  const isUnlimited = props.isUnlimited ?? false;
  const [rows, setRows] = React.useState([]);

  /// If its a new day, player can play daily again, otherwise load old state ///
  const [allowPlayer, setAllowPlayer] = React.useState(
    isUnlimited ||
      localStorage.getItem(`${userName}lastWinDate`) !==
        new Date().toLocaleDateString(),
  );
  const [guesses, setGuesses] = React.useState(
    JSON.parse(localStorage.getItem(`${userName}pastGuesses`)) ?? [],
  );
  const [win, setWin] = React.useState(false);

  const [input, setInput] = React.useState("");
  const firstRow = (
    <>
      <div className="col"></div>
      <div className="col">Your Guess</div>
      <div className="col">Result</div>
    </>
  );

  const countries = {
    france: {
      name: "France",
      stripes: ["blue", "white", "red"],
    },
    italy: {
      name: "Italy",
      stripes: ["green", "white", "red"],
    },
    belgium: {
      name: "Belgium",
      stripes: ["black", "yellow", "red"],
    },
    ireland: {
      name: "Ireland",
      stripes: ["green", "white", "orange"],
    },
    romania: {
      name: "Romania",
      stripes: ["blue", "yellow", "red"],
    },
    chad: {
      name: "Chad",
      stripes: ["blue", "yellow", "red"],
    },
    nigeria: {
      name: "Nigeria",
      stripes: ["green", "white", "green"],
    },
    mali: {
      name: "Mali",
      stripes: ["green", "yellow", "red"],
    },
    guinea: {
      name: "Guinea",
      stripes: ["red", "yellow", "green"],
    },
    "côte d'ivoire": {
      name: "Côte d'Ivoire",
      stripes: ["orange", "white", "green"],
    },
    peru: {
      name: "Peru",
      stripes: ["red", "white", "red"],
    },
    guatemala: {
      name: "Guatemala",
      stripes: ["blue", "white", "blue"],
    },
  };

  const getDayValue = (date) =>
    Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

  const [secretFlag, setSecretFlag] = React.useState(() => {
    if (isUnlimited) {
      const countryKeys = Object.keys(countries);
      return countryKeys[Math.floor(Math.random() * countryKeys.length)];
    } else {
      return "france";
    }
  });

  const newRandomFlag = () => {
    const countryKeys = Object.keys(countries);
    const randomKey =
      countryKeys[Math.floor(Math.random() * countryKeys.length)];
    setSecretFlag(randomKey);
  };

  /// If player has already won, load old game state ///
  React.useEffect(() => {
    if (
      !isUnlimited &&
      rows.length === 0 &&
      !allowPlayer &&
      guesses.length > 0
    ) {
      winAndFreeze(guesses);
      setWin(true);
    }
  }, []);

  function checkGuess(guess) {
    guess = guess.toLowerCase();
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
    if (!allowPlayer) return;
    guess = guess.toLowerCase();
    localStorage.setItem("lastGuess", guess);
    setInput("");
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    const { correct, output } = checkGuess(guess);
    const feedbackFlag = drawFlag(output);
    const guessFlag = drawFlag(countries[guess].stripes);

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

    if (correct) {
      saveStats(newGuesses.length);

      if (!isUnlimited) {
        winAndFreeze(newGuesses);
        setAllowPlayer(false);
        setWin(true);
      } else {
        setWin(true);
        setAllowPlayer(false);
      }
    }
  }

  function winAndFreeze(guesses) {
    // if (isUnlimited) return;
    localStorage.setItem(
      `${userName}lastWinDate`,
      new Date().toLocaleDateString(),
    );
    localStorage.setItem(`${userName}pastGuesses`, JSON.stringify(guesses));

    const oldRows = [];
    if (guesses.length > 0) {
      oldRows.push(firstRow);
      for (let i = 0; i < guesses.length; i++) {
        const g = guesses[guesses.length - 1 - i];
        const { output } = checkGuess(g);
        oldRows.push(
          <div className="col">{g.charAt(0).toUpperCase() + g.slice(1)}</div>,
          <div className="col">{drawFlag(countries[g].stripes)}</div>,
          <div className="col">{drawFlag(output)}</div>,
        );
      }
      setRows(oldRows);
    }
  }

  /// Stats Saving ///
  async function saveStats(guess_count) {
    // Name, Country, Daily Streak, Games Played

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

  function resetGame() {
    setInput("");
    newRandomFlag();
    setGuesses([]);
    setRows([]);
    localStorage.removeItem(`${userName}pastGuesses`);
    setAllowPlayer(true);
    setWin(false);
  }

  /// return statement ///
  return (
    <>
      {isUnlimited && win ? (
        <div className="input-group mb-3">
          <Button variant="primary" onClick={() => resetGame()}>
            New Game
          </Button>
        </div>
      ) : (
        /// input group ///
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
            disabled={!allowPlayer}
          />
          <datalist id="country-options">
            {Object.keys(countries).map((key) => (
              <option key={key}>{countries[key].name}</option>
            ))}
          </datalist>
          <Button
            variant="primary"
            onClick={() => makeGuess(input)}
            disabled={!allowPlayer}
          >
            Submit
          </Button>
        </div>
      )}

      <div className="container text-center">
        <div className="row row-cols-3">{rows}</div>
      </div>
    </>
  );
}
