import folderIcon from "../static/folder.jpeg"
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
          <button
            className="close"
            onClick={() => setModalObj({ type: "" })}
          ></button>
        </header>
        <main>
          
            <div className="prntCell">
              <img src={folderIcon}/>
              {prntList.map((page, i) => (
                <div className="prntList" key={i}>
                  <p>{page.parentTitle}</p>
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
          
          <input
            className="prntSearch"
            type="search"
            name=""
            value={prntTitle}
            onChange={(e) => setPrntTitle(e.target.value)}
            placeholder="  Add +"
          />
          </div >
          {prntPageList.length !== 0 && <div className="prntPageList">
          {prntPageList.map((page, i) => (
            <div className="prntList" key={i}>
              <p>{page.title}</p>
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
          </div>}
          <div className="title">
          {values.pageType === "todo" && <input type="checkbox" />}
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="TITLE"
            className="titleInput"
            required
          />
          </div>
          
          <div className="childCell">
            ㄴ
              {childList.map((page, i) => (
                <div className="childList" key={i}>
                  <p>{page.childTitle}</p>
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
                </div>))}
               
            <input
              className="childSearch"
              type="search"
              name=""
              value={childTitle}
              onChange={(e) => setChildTitle(e.target.value)}
              placeholder="  Add +"
            />
            </div>

            {childPageList.length !== 0 && <div className="childPageList">
            {childPageList.map((page, i) => (
              <div className="childList" key={i}>
                <p>{page.title}</p>
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
             </div>}
          <div className="when">
            <input
              type="date"
              name="date"
              value={pageDate}
              className="dateInput"
              onChange={(e) => setPageDate(e.target.value)}
            />
            {isCheckedTime && (
            <input
              type="time"
              name=""
              value={pageTime}
              onChange={(e) => setPageTime(e.target.value)}
              id=""
              className="listTime"
            />
            )}
            <label className="checkTime">
              <input
                type="checkbox"
                checked={isCheckedTime}
                onChange={(e) => setIsCheckedTime(e.target.checked)}
                
              />
              time
            </label>
          </div>
                   
          <textarea
            type="text"
            name="text"
            value={values.text}
            onChange={onChange}
            placeholder="Contents..."
            className="textInput"
          />
        </main>
        <footer>
          <div className="PageTodoType">
            <label>
              <input
                type="radio"
                name="pageType"
                value="page"
                onChange={onChange}
                defaultChecked
              />
               Page
            </label>
            <label>
              <input
                type="radio"
                name="pageType"
                value="todo"
                onChange={onChange}
              />
               Todo
            </label>
          </div>
          <button id="save" type="submit">SAVE</button>
        </footer>
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
