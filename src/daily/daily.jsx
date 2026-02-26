import React from "react";

import { Players } from "./players";
import { FlagleGame } from "./flagleGame";

export function Play(props) {
  return (
    <main className="bg-secondary">
      <Players userName={props.userName} />
      <SimonGame userName={props.userName} />
    </main>
  );
}
