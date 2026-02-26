import React from "react";

import { Button } from "react-bootstrap";
import { GameEvent, GameNotifier } from "./gameNotifier";

export function FlagleGame(props) {
  const userName = props.userName;
  const [allowPlayer, setAllowPlayer] = React.useState(true);
  const [guessCount, setGuessCount] = React.useState(0);
  const [secretFlag] = React.useState("france");
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
    const { correct, output } = checkGuess(guess);
    const feedbackFlag = drawFlag(output);
    const guessFlag = drawFlag(countries[guess].stripes);
    const text = correct ? "Correct!" : "";

    const newRow = (
      <>
        <div className="col">
          {guess}
          <br />
          Guess {guessCount}
          <br />
          {text}
        </div>
        <div className="col">{guessFlag}</div>
        <div className="col">{feedbackFlag}</div>
      </>
    );

    setRows([newRow, ...rows]);
    setGuessCount(guessCount + 1);
    setAllowPlayer(true);
  }

  return (
    <div className="game">
      <div className="row row-cols-3">{rows}</div>

      <div className="buttons">
        <Button variant="primary" onClick={() => makeGuess("france")}>
          Guess France
        </Button>
        <Button variant="primary" onClick={() => makeGuess("nigeria")}>
          Guess Nigeria
        </Button>
        <Button variant="primary" onClick={() => makeGuess("peru")}>
          Guess Peru
        </Button>
      </div>
    </div>
  );
}
