import { useState, useContext, Fragment } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import "../static/Todo.css";
import AddEventButton from "./AddEventButton";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";

export default function Todo() {
  const { setShowModal } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  let todoList = [];
  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    onError(err) {
      // console.log(err);
      if (user) {
        // window.location.replace("/");
      }
    },
    variables: { userId },
  });
  if (data) {
    todoList = data.getPages.pages.filter(
      ({ date }) =>
        dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
    );
  }

  const { onChange, onSubmit, values } = useForm(deleteTdytd, {
    userId,
    pageId: "",
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    // onError(err) {
    //   console.log(err);
    // },
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
          todoList.map((page, i) => (
            <div className="todo" key={i}>
              <p>{page.title}</p>
              <button
                name="pageId"
                value={page.id}
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
  query GetPages($userId: ID!) {
    getPages(userId: $userId) {
      id
      userId
      pages {
        id
        title
        date
        isDone
        parent {
          parentId
        }
        child {
          childId
        }
        text
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeletePage($userId: ID!, $pageId: ID!) {
    deletePage(userId: $userId, pageId: $pageId) {
      id
      userId
      username
      pages {
        id
        title
        date
        isDone
        parent {
          parentId
        }
        child {
          childId
        }
        text
        createdAt
      }
    }
  }
`;
