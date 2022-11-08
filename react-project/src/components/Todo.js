import { useState, useContext, Fragment } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import "../static/Todo.css";
import AddEventButton from "./AddEventButton";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

export default function Todo() {
  const { user } = useContext(AuthContext);

  const { setShowModal } = useContext(GlobalContext);

  const userId = user?.id;
  let todoList = [];
  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    onError(err) {
      console.log(err);
      if (user) {
        window.location.replace("/");
      }
    },
    variables: { userId },
  });
  if (data) {
    todoList = data.getTodos.todos;
  }

  const { onChange, onSubmit, values } = useForm(deleteTdytd, {
    userId,
    todoId: "",
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function deleteTdytd() {
    deleteTodo();
  }

  async function onClickFn(e) {
    await onChange(e);
    onSubmit(e);
  }

  function NullTodo() {
    return (
      <div className="nullTodoList">
        <p>할 일을 추가하세요</p>
        <button onClick={() => setShowModal("todo")}>+</button>
      </div>
    );
  }

  function ShowTodo() {
    return (
      <div className="todoList">
        {error ? (
          userId ? (
            <h1>Error!</h1>
          ) : (
            <h1>Please Login</h1>
          )
        ) : (
          data &&
          todoList.map((todo, i) => (
            <div className="todo" key={i}>
              <p>{todo.todo}</p>
              <button
                name="todoId"
                value={todo.id}
                onClick={onClickFn}
                type="submit"
              >
                -
              </button>
              <button onClick={() => setShowModal("todo")}>+</button>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="todayTodo">
      <div className="todoTitle">Today's To-Do List</div>
      {!todoList && <NullTodo />}
      <ShowTodo />
      <AddEventButton />
    </div>
  );
}

const FETCH_TODOS_QUERY = gql`
  query getTodos($userId: ID!) {
    getTodos(userId: $userId) {
      id
      todos {
        id
        date
        todo
        createdAt
      }
      username
      userId
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($userId: ID!, $todoId: ID!) {
    deleteTodo(userId: $userId, todoId: $todoId) {
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
