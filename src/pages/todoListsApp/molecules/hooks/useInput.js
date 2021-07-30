import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addTodoList,
  addTodoItem,
} from "../../../../store/todoListsApp/reducers/todoSlice";

export default function useInput(todoListId = null) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const add = () => {
    if (input) {
      if (!todoListId) {
        dispatch(addTodoList(input));
      } else {
        dispatch(addTodoItem({ input, todoListId }));
      }
    }
    setInput("");
  };

  return [input, setInput, add];
}
