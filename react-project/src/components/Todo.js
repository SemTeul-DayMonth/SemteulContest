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
  const userId = user?.id;
  const { setShowModal } = useContext(GlobalContext);
  const [todoList, setTodoList] = useState([]);
  const { error } = useQuery(FETCH_TODOS_QUERY, {
    onCompleted({ getTodos: { todos } }) {
      setTodoList(todos);
    },
    onError(err) {
      console.log(err);
    },
    variables: { userId },
  });

  const { onChange, onSubmit, values } = useForm(deleteTdytd, {
    userId,
    todoId: "",
  });

  const [deleteTodo, { loading }] = useMutation(DELETE_TODO, {
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function deleteTdytd() {
    deleteTodo();
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
          <h1>Error!</h1>
        ) : (
          todoList &&
          todoList.map((todo, i) => (
            <div className="todo" key={i}>
              {console.log(todo)}
              <p>{todo.todo}</p>
              <form action="" method="post" onSubmit={onSubmit}>
                <input
                  type="hidden"
                  name="todoId"
                  value={todo.id}
                  onLoad={onChange}
                />
                <button type="submit">-</button>
              </form>

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
