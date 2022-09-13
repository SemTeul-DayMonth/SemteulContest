import "../static/Main.css";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AddEventButton() {
  const { setIsTodoModal } = useContext(GlobalContext);

  return (
    <div onClick={() => setIsTodoModal(true)} className="addEvtBtn">
      +
    </div>
  );
}
