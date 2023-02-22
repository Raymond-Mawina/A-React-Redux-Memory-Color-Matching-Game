import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { AppContainer } from "./App.js";
import store from "./redux/store.js";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
