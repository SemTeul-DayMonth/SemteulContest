import "../static/PageModal.css";
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
  const [pageDate, setPageDate] = useState(
    modalObj.date || dayjs().format("YYYY-MM-DD")
  );
  const [pageTime, setPageTime] = useState(
    modalObj.time || dayjs().format("HH:mm")
  );
  const [isCheckedTime, setIsCheckedTime] = useState(false);
  const [prntTitle, setPrntTitle] = useState("");
  const [childTitle, setChildTitle] = useState("");
  let prntPageList = [];
  let childPageList = [];
  const [prntList, setPrntList] = useState(modalObj.parent || []);
  const [childList, setChildList] = useState(modalObj.child || []);
  const { onChange, onSubmit, values } = useForm(createPageCb, {
    date: pageDate,
    title: "",
    pageType: "page",
    parentInput: prntList,
    childInput: childList,
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
    values.childInput = childList;
    values.date = isCheckedTime ? pageDate + " " + pageTime : pageDate;
    createPage();
    setModalObj({ type: "" });
  }

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data && prntTitle) {
    prntPageList = data.getPages.pages.filter(
      ({ title, id }) =>
        title.includes(prntTitle) &&
        childList.filter(({ childId }) => childId === id).length === 0
    );
  }

  if (data && childTitle) {
    childPageList = data.getPages.pages.filter(
      ({ title, id }) =>
        title.includes(childTitle) &&
        prntList.filter(({ parentId }) => parentId === id).length === 0
    );
  }

  function addPrnt(checked, title, date, id) {
    if (checked) {
      setPrntList([
        ...prntList,
        { parentTitle: title, parentDate: date, parentId: id },
      ]);
    } else {
      setPrntList(prntList.filter(({ parentId }) => parentId !== id));
    }
  }

  function addChild(checked, title, date, id) {
    if (checked) {
      setChildList([
        ...childList,
        { childTitle: title, childDate: date, childId: id },
      ]);
    } else {
      setChildList(childList.filter(({ childId }) => childId !== id));
    }
  }

  return (
    <div className="bgModal">
      <form
        action=""
        method="post"
        className="pageDateModal"
        onSubmit={onSubmit}
      >
        <header>
          <span className="grippy"></span>
          <button
            className="close"
            onClick={() => setModalObj({ type: "" })}
          ></button>
        </header>
        <main>
          {values.pageType === "todo" && <input type="checkbox" />}
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Add Page Title"
            className="titleInput"
            required
          />
          <input
            type="date"
            name="date"
            value={pageDate}
            onChange={(e) => setPageDate(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={isCheckedTime}
              onChange={(e) => setIsCheckedTime(e.target.checked)}
            />
            time
          </label>

          {isCheckedTime && (
            <input
              type="time"
              name=""
              value={pageTime}
              onChange={(e) => setPageTime(e.target.value)}
              id=""
            />
          )}

          {(prntList.length !== 0 || childList.length !== 0) && (
            <div className="relevantPages">
              {prntList.length !== 0 && <p>Parent Pages</p>}
              {prntList.map((page, i) => (
                <div className="todo" key={i}>
                  <p>{page.parentTitle}</p>
                  <p>{dayjs(page.parentDate).format("YYYY-MM-DD")}</p>
                  <input
                    type="checkbox"
                    checked={prntList.some(
                      ({ parentId }) => parentId === page.parentId
                    )}
                    onChange={(e) => {
                      addPrnt(
                        e.target.checked,
                        page.parentTitle,
                        page.parentDate,
                        page.parentId
                      );
                    }}
                  />
                </div>
              ))}
              {childList.length !== 0 && <p>Child Pages</p>}
              {childList.map((page, i) => (
                <div className="todo" key={i}>
                  <p>{page.childTitle}</p>
                  <p>{dayjs(page.childDate).format("YYYY-MM-DD")}</p>
                  <input
                    type="checkbox"
                    checked={childList.some(
                      ({ childId }) => childId === page.childId
                    )}
                    onChange={(e) => {
                      addChild(
                        e.target.checked,
                        page.childTitle,
                        page.childDate,
                        page.childId
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {prntList.length === 0 && <p>Select Parent</p>}
          <input
            type="search"
            name=""
            value={prntTitle}
            onChange={(e) => setPrntTitle(e.target.value)}
            placeholder="Search Parent"
          />
          {prntPageList.map((page, i) => (
            <div className="todo" key={i}>
              <p>{page.title}</p>
              <p>{dayjs(page.date).format("YYYY-MM-DD")}</p>
              <input
                type="checkbox"
                checked={prntList.some(({ parentId }) => parentId === page.id)}
                name={page.id}
                onChange={(e) => {
                  addPrnt(e.target.checked, page.title, page.date, page.id);
                }}
              />
            </div>
          ))}

          {childList.length === 0 && <p>Select Child</p>}
          <input
            type="search"
            name=""
            value={childTitle}
            onChange={(e) => setChildTitle(e.target.value)}
            placeholder="Search Child"
          />
          {childPageList.map((page, i) => (
            <div className="todo" key={i}>
              <p>{page.title}</p>
              <p>{dayjs(page.date).format("YYYY-MM-DD")}</p>
              <input
                type="checkbox"
                checked={childList.some(({ childId }) => childId === page.id)}
                name={page.id}
                onChange={(e) => {
                  addChild(e.target.checked, page.title, page.date, page.id);
                }}
              />
            </div>
          ))}

          <div className="pageContent">
            <h4>contents</h4>
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
            <input
              type="radio"
              name="pageType"
              value="page"
              onChange={onChange}
              defaultChecked
            />
            page
          </label>
          <label>
            <input
              type="radio"
              name="pageType"
              value="todo"
              onChange={onChange}
            />
            todo
          </label>
        </main>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

const CREATE_PAGE = gql`
  mutation CreatePage(
    $date: String!
    $title: String!
    $userId: ID!
    $parentInput: [ParentInput]
    $childInput: [ChildInput]
    $pageType: String!
  ) {
    createPage(
      pageInput: {
        date: $date
        title: $title
        userId: $userId
        parentInput: $parentInput
        childInput: $childInput
        pageType: $pageType
      }
    ) {
      id
      pages {
        id
        title
        date
        isDone
        createdAt
        parent {
          parentId
          parentTitle
          parentDate
        }
        childs {
          childId
          childDate
          childTitle
        }
        text
        pageType
      }
      userId
      username
    }
  }
`;
