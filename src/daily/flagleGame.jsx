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

  async function newGame() {
    setAllowPlayer(false);
    await delay(1000);

    // Let other players know a new game has started
    GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
  }

  function getRandomFlag() {
    let b = Array.from(countries.values());
    return countries[Math.floor(Math.random() * countries.length)];
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
