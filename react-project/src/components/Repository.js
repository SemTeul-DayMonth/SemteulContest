import { Fragment, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";
import { FETCH_TODOS_QUERY } from "../utils/querys";
import { useNavigate, useParams, useLocation, useH } from "react-router-dom";
import "../static/Repository.css";

export default function Repository() {
  const location = useLocation();
  const indexs = location.pathname.split("/").slice(2);
  const props = location.state;
  const { pageMode, modalObj, setModalObj } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let defaultPageList = [];
  let pageList = [];
  const { error, data, refetch } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data) {
    defaultPageList = data.getPages.pages.filter(
      ({ parent }) => parent.length === 0
    );
  }
  if (props) {
    pageList = data.getPages.pages.filter(({ id }) =>
      props.some(({ childId }) => id === childId)
    );
  }

  return (
    <div className="repo">
      <nav>
        <button onClick={() => navigate("/month/" + dayjs().format("YYYY/MM"))}>
          X
        </button>
        <button onClick={() => navigate(-1)}>back</button>
      </nav>
      <main>
        {indexs[0]
          ? pageList.map((page, i) => (
              <div className="repoCell" key={i}>
                <div
                  onClick={() => {
                    navigate(location.pathname + "/" + String(i), {
                      state: page.childs,
                    });
                  }}
                  key={i}
                >
                  {page.title}
                </div>
                <div
                  onClick={() =>
                    setModalObj({ type: "pageView", page, refetch })
                  }
                >
                  +
                </div>
              </div>
            ))
          : defaultPageList.map((page, i) => (
              <div className="repoCell" key={i}>
                <div
                  onClick={() => {
                    navigate(String(i), { state: page.childs });
                  }}
                  key={i}
                >
                  {page.title}
                </div>
                <div
                  onClick={() =>
                    setModalObj({ type: "pageView", page, refetch })
                  }
                >
                  +
                </div>
              </div>
            ))}
      </main>
    </div>
  );
}
