import React from "react";

import { FlagleGame } from "./flagleGame";

export function Daily(props) {
  return (
    <main className="bg-secondary">
      <h1>Daily Flagle</h1>
      <FlagleGame userName={props.userName} />
    </main>
  );
}
