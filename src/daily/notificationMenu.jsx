import React, { useState } from "react";
import { GameNotifier } from "./gameNotifier";
import { GameEvent } from "./gameNotifier";

export function NotificationMenu(props) {
  const userName = props.userName;
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [events, setEvent] = React.useState([]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, []);

  function handleGameEvent(event) {
    setEvent((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 10) {
        newEvents = newEvents.slice(1, 10);
      }
      return newEvents;
    });
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = "unknown";
      if (event.type === GameEvent.End) {
        message = ` got the daily flagle in ${event.value.score} guesses`;
      } else if (event.type === GameEvent.Dstart) {
        message = ` started the daily flagle`;
      } else if (event.type === GameEvent.Ustart) {
        message = ` started an unlimited flagle`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className="event">
          <li className="list-group-item">
            {event.from.split("@")[0]}
            {message}
          </li>
        </div>,
      );
    }
    return messageArray;
  }

  return (
    <div className="collapse_menu">
      <button className="btn btn-primary" onClick={toggleNotifications}>
        Notifications <span className="badge text-bg-secondary">{count}</span>
      </button>

      <div
        className={`collapse ${isOpen ? "show" : ""}`}
        id="notificationCollapse"
      >
        <div className="card card-body">
          <ul id="notification_daily" className="list-group">
            {createMessageArray()}
          </ul>
        </div>
      </div>
    </div>
  );
}
