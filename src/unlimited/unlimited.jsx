import React from "react";

import { FlagleGame } from "../daily/flagleGame";
// import { NotificationMenu } from "../daily/notificationMenu";
import "./unlimited.css";

export function Unlimited(props) {
  return (
    <main>
      <div className="flag_banner">
        <img src="flag_banner.png" alt="flag banner image" />
      </div>

      <div style={{ paddingTop: "79px" }} />

      <FlagleGame userName={props.userName} isUnlimited={true} />
    </main>
  );
}
