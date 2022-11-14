import "../static/PageModal.css";
import GlobalContext from "../context/GlobalContext";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import { useForm } from "../utils/hooks";

export default function PageModal() {
  const { modalObj, setModalObj } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const { onChange, onSubmit, values } = useForm(createTdytd, {
    date: dayjs().format("YYYY-MM-DD").toString(),
    title: "",
    parent: modalObj.parent ? modalObj.parent : [],
    text: "",
    userId,
  });

  const [createPage] = useMutation(CREATE_PAGE, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: values,
  });

  async function createTdytd() {
    createPage();
    setModalObj({ type: "" });
  }

  return (
    <div className="bgModal">
      <form action="" method="post" className="pageModal" onSubmit={onSubmit}>
        <header>
          <span className="grippy"></span>
          <button
            className="close"
            onClick={() => setModalObj({ type: "" })}
          ></button>
        </header>
        <main>
          <input
            type="text"
            name="title"
            value={values.title}
            placeholder="Add Page"
            onChange={onChange}
            className="titleInput"
            required
          />
          <input
            type="date"
            name="date"
            value={values.date}
            placeholder="Add Page Title"
            onChange={onChange}
            className="dateInput"
            required
          />
          <div className="pageContent">
            <h3>contents</h3>
            <input
              type="text"
              name="text"
              value={values.text}
              onChange={onChange}
              placeholder="Add Text"
              className="textInput"
            />
          </div>

          <label>
            <input type="radio" name="type" value="pageType" id="pageType" />
            page
          </label>
          <label>
            <input type="radio" name="type" value="todoType" id="todoType" />
            todo
          </label>
          <button type="submit">save</button>
        </main>
      </form>
    </div>
  );
}

const CREATE_PAGE = gql`
  mutation CreatePage($date: String!, $title: String!, $userId: ID!) {
    createPage(pageInput: { date: $date, title: $title, userId: $userId }) {
      id
      pages {
        id
        title
        date
        isDone
        createdAt
        parent {
          parentId
        }
        child {
          childId
        }
        text
        pageType
      }
      userId
      username
    }
  }
`;
