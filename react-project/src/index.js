import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./static/index.css";
import Main from "./pages/Main";
import ContextWrapper from "./context/ContextWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <Main />
    </ContextWrapper>
  </React.StrictMode>
);
