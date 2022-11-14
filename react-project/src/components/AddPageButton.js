import "../static/Main.css";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AddPageButton() {
  const { setModalObj } = useContext(GlobalContext);

  return (
    <div onClick={() => setModalObj({ type: "page" })} className="addEvtBtn">
      +
    </div>
  );
}
