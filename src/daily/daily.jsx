import React from "react";

import { FlagleGame } from "./flagleGame";
import { NotificationMenu } from "./notificationMenu";
import "./daily.css";

export function Daily(props) {
  return (
    <main>
      <div className="flag_banner">
        <img src="flag_banner.png" alt="flag banner image" />
      </div>

      <NotificationMenu userName={props.userName} />

      <FlagleGame userName={props.userName} />
    </main>
  );
}
