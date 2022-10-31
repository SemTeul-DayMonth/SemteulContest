import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/auth";
import ContextWrapper from "./context/ContextWrapper";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./static/index.css";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <ContextWrapper>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route
              path="/login"
              render={(props) =>
                user ? <Navigate replace to="/" /> : <Login {...props} />
              }
            />
            <Route
              path="/register"
              render={(props) =>
                user ? <Navigate replace to="/" /> : <Register {...props} />
              }
            /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ContextWrapper>
  );
}

export default App;
