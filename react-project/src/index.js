import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import ContextWrapper from "./context/ContextWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <Main />
    </ContextWrapper>
  </React.StrictMode>
);
