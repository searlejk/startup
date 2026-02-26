import React from "react";

import { Button } from "react-bootstrap";
import { delay } from "./delay";
import { GameEvent, GameNotifier } from "./gameNotifier";

export function flagleGame(props) {
  const userName = props.userName;
  const secretFlag = "France";
  const countries = {
    france: {
      name: "France",
      stripes: ["blue", "white", "red"],
    },
    nigeria: {
      name: "Nigeria",
      stripes: ["green", "white", "red"],
    },
    peru: {
      name: "Peru",
      stripes: ["red", "white", "red"],
    },
  };
  const guessCount = 0;

  async function onPressed(input) {
    if (allowPlayer) {
      setAllowPlayer(false);
      await delay(1000);
    }

    if (input === secretFlag) {
      // Correct
      GameNotifier.notify(GameEvent.CORRECT);
    } else {
      // Wrong
      GameNotifier.notify(GameEvent.WRONG);
    }
  }

  function checkGuess(guess) {
    guessFlag = countries[guess];
    trueFlag = countries[secretFlag];
    const output = [];

    for (i in Range(2)) {
      if (guessFlag[i] === trueFlag[i]) {
        output.concat(guessFlag[i]);
      } else {
        output.concat("grey");
      }
    }

    return output;
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

  function returnRow(guess) {
    feedbackFlag = drawFlag(checkGuess(guess));
    guessFlag = drawFlag(countries[guess].stripes);

    return (
      <>
        <div className="col">
          Guess #{guessCount}
          <br />({guess})
          <br />
          Correct!
        </div>
        <div className="col">{guessFlag}</div>
        <div className="col">{feedbackFlag}</div>
      </>
    );
  }

  async function newGame() {
    setAllowPlayer(false);
    await delay(1000);

    secretFlag = getRandomFlag();
    setAllowPlayer(true);

    // Let other players know a new game has started
    GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
  }

  function getRandomFlag() {
    let b = Array.from(countries.names());
    return countries[b[Math.floor(Math.random() * b.length)]].name;
  }

  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem("scores");
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
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

    localStorage.setItem("scores", JSON.stringify(scores));
  }
}
