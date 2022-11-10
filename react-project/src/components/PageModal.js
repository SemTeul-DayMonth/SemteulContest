import "../static/PageModal.css";
import GlobalContext from "../context/GlobalContext";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import { useForm } from "../utils/hooks";

export default function PageModal() {
  const { modalDate, setModalDate } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const { onChange, onSubmit, values } = useForm(createTdytd, {
    date: dayjs().format("YYYY-MM-DD").toString(),
    title: "",
    userId,
  });

  const [createPage] = useMutation(CREATE_PAGE, {
    onError(err) {
      // console.log(err);
    },
    variables: values,
  });

  async function createTdytd() {
    createPage();
    setModalDate("");
  }

  return (
    <div className="bgModal">
      <form action="" method="post" className="pageModal" onSubmit={onSubmit}>
        <header>
          <span className="grippy"></span>
          <button className="close" onClick={() => setModalDate("")}></button>
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
            placeholder="Add Page"
            onChange={onChange}
            className="dateInput"
            required
          />
        </main>
        <button type="submit">submit</button>
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
      }
      userId
      username
    }
  }
`;
