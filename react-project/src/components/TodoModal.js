import "../static/TodoModal.css";
import GlobalContext from "../context/GlobalContext";
import { useContext, useState } from "react";
import Axios from "axios";

export default function TodoModal() {
  const { showModal, setShowModal, dispatchCalTodo } =
    useContext(GlobalContext);
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("loading post");
    Axios.post("http://localhost:8000/", {
      todoName: title,
    }).then(() => {
      console.log("success post");
    });
  }

  return (
    <div className="bgModal">
      <form action="" className="todoModal">
        <header>
          <span className="grippy"></span>
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
