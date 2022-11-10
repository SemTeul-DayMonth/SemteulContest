import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";
import FETCH_TODOS_QUERY from "../utils/querys";

export default function TodoList({ todoDate }) {
  const { setModalDate } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let todoList = [];

  useEffect(() => {
    if (user && !userId) {
      window.location.replace("/");
    }
  }, [user]);

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data) {
    todoList = data.getPages.pages.filter(
      ({ date }) =>
        dayjs(date).format("YYYY-MM-DD") === todoDate.format("YYYY-MM-DD")
    );
  }

  const { onChange, onSubmit, values } = useForm(deleteTdytd, {
    userId,
    pageId: "",
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: values,
  });

  function deleteTdytd() {
    deleteTodo();
  }
  async function onClickFn(e) {
    await onChange(e);
    onSubmit(e);
  }

  return (
    <div className="todoList">
      {error ? (
        userId ? (
          <h1>Error!</h1>
        ) : (
          <h1>Please Login</h1>
        )
      ) : todoList.length !== 0 ? (
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
            <button onClick={() => setModalDate(todoDate)}>+</button>
          </div>
        ))
      ) : (
        <h1>할 일을 추가하세요</h1>
      )}
      <button className="addTodoBtn" onClick={() => setModalDate(todoDate)}>
        +
      </button>
    </div>
  );
}

const DELETE_TODO = gql`
  mutation DeletePage($userId: ID!, $pageId: ID!) {
    deletePage(userId: $userId, pageId: $pageId) {
      id
      userId
      username
      pages {
        id
        title
        todoDate
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
