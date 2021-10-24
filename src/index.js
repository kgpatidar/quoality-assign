import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { NotesProvider } from "./Context/NotesContext";

ReactDOM.render(
  <NotesProvider>
    <App />
  </NotesProvider>,
  document.getElementById("root")
);
