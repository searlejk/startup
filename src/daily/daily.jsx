import React from "react";

import { FlagleGame } from "./flagleGame";

export function Daily(props) {
  return (
    <main>
      <div className="flag_banner">
        <img src="flag_banner.png" alt="flag banner image" />
      </div>
      <div className="container text-center">
        <FlagleGame userName={props.userName} />
      </div>
    </main>
  );
}
