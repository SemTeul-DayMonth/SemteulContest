import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import ContextWrapper from "./context/ContextWrapper";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./static/index.css";
import "./static/module.css";
function App() {
  return (
    <ContextWrapper>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ContextWrapper>
  );
}

export default App;
