import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";
import { FETCH_TODOS_QUERY } from "../utils/querys";

export default function PageList({ pageDate }) {
  const { setModalObj } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let pageList = [];

  useEffect(() => {
    if (user && !userId) {
      window.location.replace("/");
    }
  }, [user]);

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data) {
    pageList = data.getPages.pages.filter(
      ({ date }) =>
        dayjs(date).format("YYYY-MM-DD") === pageDate.format("YYYY-MM-DD")
    );
  }

  const { onChange, onSubmit, values } = useForm(deletePageCb, {
    userId,
    pageId: "",
  });

  const [deletePage] = useMutation(DELETE_PAGE, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: values,
  });

  function deletePageCb() {
    deletePage();
  }

  async function onClickFn(e) {
    await onChange(e);
    onSubmit(e);
  }

  return (
    <div className="pageList">
      {error ? (
        userId ? (
          <p>Error!</p>
        ) : (
          <p>Please Login</p>
        )
      ) : pageList.length !== 0 ? (
        pageList.map((page, i) => (
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
            <button
              onClick={() =>
                setModalObj({
                  date: pageDate,
                  parent: [{ parentId: page.id }],
                  type: "pageDate",
                })
              }
            >
              +
            </button>
          </div>
        ))
      ) : (
        <p>할 일을 추가하세요</p>
      )}
      <button
        className="addTodoBtn"
        onClick={() =>
          setModalObj({
            date: pageDate,
            type: "pageDate",
          })
        }
      >
        +
      </button>
    </div>
  );
}

const DELETE_PAGE = gql`
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
        pageType
        createdAt
      }
    }
  }
`;
