import React from "react";

import "../static/Login.css";

function Login() {
  return (
    <div className="login">
      <form action="">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
