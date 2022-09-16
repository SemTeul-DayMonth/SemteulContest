import "../static/EventModal.css";
import GlobalContext from "../context/GlobalContext";
import { useContext, useState } from "react";

export default function EventModal() {
  const { showModal, setShowModal, dispatchCalTodo } =
    useContext(GlobalContext);
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const todoPayload = {
      title,
    };
    dispatchCalTodo({ type: "push", payload: todoPayload });
    setShowModal("");
  }

  return (
    <div className="bgModal">
      <form action="" className="eventModal">
        <header>
          <nav>
            <div>todo</div>
            <div>repo</div>
          </nav>
          <button className="close" onClick={() => setShowModal("")}></button>
        </header>
        <main>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="titleInput"
          />
        </main>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}
