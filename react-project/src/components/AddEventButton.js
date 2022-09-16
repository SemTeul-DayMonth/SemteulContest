import "../static/Main.css";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AddEventButton() {
  const { setShowModal } = useContext(GlobalContext);

  return (
    <div onClick={() => setShowModal("event")} className="addEvtBtn">
      +
    </div>
  );
}
