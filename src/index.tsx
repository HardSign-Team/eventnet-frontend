import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./index.scss";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
