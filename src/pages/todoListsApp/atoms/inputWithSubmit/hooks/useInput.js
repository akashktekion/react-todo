import { useCallback } from "react";

import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
} from "../../../../../store/todoListsApp/actions/actionTypes";

const useInput = (
  input,
  setInputText,
  addTodoList,
  addTodoItem,
  updateTodoItem,
  setEditingItemId,
  actionType,
  todoListId,
  todoItemId
) => {
  const changeHandler = useCallback(
    (e) => setInputText(e.target.value),
    [setInputText]
  );
  const submitHandler = useCallback(
    (e) => {
      if (input && (e.key === "Enter" || e.target.id === "addNew")) {
        switch (actionType) {
          case ADD_TODO_LIST:
            addTodoList(input);
            setInputText("");
            break;
          case ADD_TODO_ITEM:
            addTodoItem(input, todoListId);
            setInputText("");
            break;
          case UPDATE_TODO_ITEM:
            updateTodoItem(input, todoListId, todoItemId);
            setInputText("");
            break;
          default:
            break;
        }
      }
    },
    [
      actionType,
      addTodoItem,
      addTodoList,
      input,
      todoListId,
      setInputText,
      updateTodoItem,
      todoItemId,
    ]
  );

  const cancelHandler = useCallback(
    (e) => {
      if (e.target.id === "cancelBtn") {
        setEditingItemId("");
        setInputText("");
      }
    },
    [setEditingItemId, setInputText]
  );

  return [changeHandler, submitHandler, cancelHandler];
};

export default useInput;
