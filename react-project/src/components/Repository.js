import { Fragment, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";
import { FETCH_TODOS_QUERY } from "../utils/querys";
import { useNavigate } from "react-router-dom";

export default function Repository() {
  const { pageMode, modalObj, setModalObj } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let pageList = [];

  useEffect(() => {
    if (user && !userId) {
      window.location.replace("/");
    }
  }, [user]);

  const { error, data, refetch } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data) {
    pageList = data.getPages.pages.filter(({ parent }) => parent.length === 0);
  }
  function PageCell({ page }) {
    return (
      <Fragment>
        <div className="pageCell">
          <p onClick={() => setModalObj({ type: "pageView", page, refetch })}>
            {page.title}
          </p>
          <button name="pageId" value={page.id} type="submit">
            -
          </button>
          <button
            onClick={() =>
              setModalObj({
                parent: [
                  {
                    parentId: page.id,
                    parentDate: page.date,
                    parentTitle: page.title,
                  },
                ],
                type: "page",
              })
            }
          >
            +
          </button>
        </div>
        {page.childs.map((page, i) => (
          <div className="familyPage" key={i}>
            <PageTree page={page} childNum={1} />
          </div>
        ))}
      </Fragment>
    );
  }

  function PageTree({ page, childNum }) {
    const nowPage = data.getPages.pages.find(({ id }) => id === page.childId);
    return (
      <Fragment>
        <div
          className="pageCell"
          style={{ transform: "translateX(" + String(40 * childNum) + "px)" }}
        >
          <p
            onClick={() =>
              setModalObj({ type: "pageView", page: nowPage, refetch })
            }
          >
            {nowPage.title}
          </p>
          <button name="pageId" value={nowPage.id} type="submit">
            -
          </button>
          <button
            onClick={() =>
              setModalObj({
                parent: [
                  {
                    parentId: nowPage.id,
                    parentDate: nowPage.date,
                    parentTitle: nowPage.title,
                  },
                ],
                type: "page",
              })
            }
          >
            +
          </button>
        </div>
        {nowPage.childs.map((page, i) => (
          <div className="familyPage" key={i}>
            <PageTree page={page} childNum={childNum + 1} />
          </div>
        ))}
      </Fragment>
    );
  }

  return (
    <div>
      <p>repository</p>
      {pageList.map((page, i) => (
        <div className="familyPage" key={i}>
          <PageCell page={page} />
        </div>
      ))}
      <button onClick={() => navigate("/month/" + dayjs().format("YYYY/MM"))}>
        X
      </button>
    </div>
  );
}
