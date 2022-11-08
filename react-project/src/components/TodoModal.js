import "../static/TodoModal.css";
import GlobalContext from "../context/GlobalContext";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useContext, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import { useForm } from "../utils/hooks";

export default function TodoModal() {
  const { showModal, setShowModal, dispatchCalTodo } =
    useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(createTdytd, {
    date: dayjs(new Date()).format("YYYY-MM-DD").toString(),
    todo: "",
    userId: user.id,
  });

  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function createTdytd() {
    createTodo();
  }

  return (
    <div className="bgModal">
      <form action="" method="post" className="todoModal" onSubmit={onSubmit}>
        <header>
          <span className="grippy"></span>
          <button className="close" onClick={() => setShowModal("")}></button>
        </header>
        <main>
          <input
            type="text"
            name="todo"
            placeholder="Add todo"
            onChange={onChange}
            className="titleInput"
          />
        </main>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

const CREATE_TODO = gql`
  mutation CreateTodo($userId: ID!, $date: String!, $todo: String!) {
    createTodo(userId: $userId, date: $date, todo: $todo) {
      id
      userId
      username
      todos {
        id
        date
        todo
        createdAt
      }
    }
  }
`;
