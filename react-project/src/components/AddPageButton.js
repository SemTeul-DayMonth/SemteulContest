import "../static/Main.css";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AddPageButton() {
  const { setModalDate } = useContext(GlobalContext);

  return (
    <div onClick={() => setModalDate("page")} className="addEvtBtn">
      +
    </div>
  );
}
