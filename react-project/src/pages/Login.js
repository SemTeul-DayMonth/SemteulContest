import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import "../static/Login.css";
import { useForm } from "../utils/hooks";

function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  });

  const [checkUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUser() {
    checkUser();
  }

  return (
    <div className="login">
      <form action="" method="post" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="login_err">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export default Login;
