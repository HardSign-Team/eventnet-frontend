import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { MainStore } from "./stores/MainStore";
import { configure } from "mobx";
import './index.scss'

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  observableRequiresReaction: true,
});

render(
  <React.StrictMode>
    <App store={new MainStore()} />
  </React.StrictMode>,
  document.getElementById("root")
);
