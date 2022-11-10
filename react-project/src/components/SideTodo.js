import { useState, useContext, Fragment, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import "../static/Todo.css";
import AddPageButton from "./AddPageButton";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import dayjs from "dayjs";
import TodoList from "./TodoList";

export default function SideTodo() {
  return (
    <div className="todayTodo">
      <div className="todoTitle">Today's To-Do List</div>
      <TodoList todoDate={dayjs()} />
      <AddPageButton />
    </div>
  );
}
