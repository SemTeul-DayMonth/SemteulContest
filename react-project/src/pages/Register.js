import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

import "../static/Register.css";

function Register(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      console.log(navigate);
      navigate("/");
      console.log(userData);
    },
    // update(proxy, result) {
    //   console.log(result);
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
      console.log("err:", err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
    console.log("register");
  }

  return (
    <div className="register">
      <form action="/" method="post" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={values.username}
          placeholder="Username"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="Password"
          onChange={onChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          placeholder="Confirm Password"
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          value={values.email}
          placeholder="Email"
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="register_err">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      {loading && <h1>loading</h1>}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
