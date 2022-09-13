import { useState, useContext, Fragment } from "react";
import "../static/Todo.css";
import AddEventButton from "./AddEventButton";
import GlobalContext from "../context/GlobalContext";

export default function Todo() {
  const { savedTodos, dispatchCalTodo, isTodoModal, setIsTodoModal } =
    useContext(GlobalContext);

  function NullTodo() {
    return (
      <div className="nullTodoList">
        <p>할 일을 추가하세요</p>
        <button onClick={() => setIsTodoModal(true)}>+</button>
      </div>
    );
  }

  function ShowTodo() {
    return (
      <div className="todoList">
        {savedTodos.map((todo, i) => (
          <div className="todo" key={i}>
            <p>{todo.title}</p>
            <button onClick={() => setIsTodoModal(true)}>+</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="todayTodo">
      <div className="todoTitle">Today's To-Do List</div>
      {savedTodos.length === 0 && <NullTodo />}
      <ShowTodo />
      <AddEventButton />
    </div>
  );
}
