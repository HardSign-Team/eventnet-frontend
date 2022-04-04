import React from "react";
import { render } from "react-dom";
import App from "./App";
import { EventStoreProvider } from "./contexts/EventContext";

render(
  <React.StrictMode>
    <EventStoreProvider>
      <App />
    </EventStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
