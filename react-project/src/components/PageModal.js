import "../static/PageDateModal.css";
import GlobalContext from "../context/GlobalContext";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import { useForm } from "../utils/hooks";
import { FETCH_TODOS_QUERY } from "../utils/querys";

export default function PageModal() {
  const { modalObj, setModalObj } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [prntTitle, setPrntTitle] = useState("");
  let pageList = [];
  const [prntList, setPrntList] = useState([]);

  const { onChange, onSubmit, values } = useForm(createPageCb, {
    date: dayjs().format("YYYY-MM-DD").toString(),
    title: "",
    pageType: "page",
    parentInput: prntList,
    text: "",
    userId,
  });

  const [createPage] = useMutation(CREATE_PAGE, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: values,
  });

  async function createPageCb() {
    values.parentInput = prntList;
    createPage();
    setModalObj({ type: "" });
  }

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data && prntTitle) {
    pageList = data.getPages.pages.filter(({ title }) =>
      title.includes(prntTitle)
    );
  }

  function addPrnt(checked, title, date, id) {
    if (checked) {
      setPrntList([...prntList, { title, date, id }]);
    } else {
      setPrntList(prntList.filter((prnt) => prnt.id !== id));
    }
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
        childs {
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
