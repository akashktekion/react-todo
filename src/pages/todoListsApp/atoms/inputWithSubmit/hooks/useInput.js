import { useState, useCallback } from "react";

import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
} from "../../../../../store/todoListsApp/actions/actionTypes";

const useInput = (addTodoList, addTodoItem, actionType, todoListId) => {
  const [input, setInput] = useState("");

  const changeHandler = useCallback((e) => setInput(e.target.value), []);
  const submitHandler = useCallback(
    (e) => {
      if (input && (e.key === "Enter" || e.target.id === "addNew")) {
        switch (actionType) {
          case ADD_TODO_LIST:
            addTodoList(input);
            setInput("");
            break;
          case ADD_TODO_ITEM:
            addTodoItem(input, todoListId);
            setInput("");
            break;
          default:
            break;
        }
      }
    },
    [actionType, addTodoItem, addTodoList, input, todoListId]
  );

  return [input, changeHandler, submitHandler];
};

export default useInput;
