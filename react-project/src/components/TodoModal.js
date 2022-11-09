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
    date: dayjs().format("YYYY-MM-DD").toString(),
    title: "",
    userId: user.id,
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    onError(err) {
      console.log(err);
    },
    variables: { pageInput: values },
  });

  async function createTdytd() {
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
            name="title"
            placeholder="Add todo"
            onChange={onChange}
            className="titleInput"
            required
          />
        </main>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

const CREATE_TODO = gql`
  mutation CreatePage($pageInput: PageInput) {
    createPage(pageInput: $pageInput) {
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
