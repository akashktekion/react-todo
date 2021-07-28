import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo, addTodoTask } from "../../../store/todoSlice";

export default function useInput(id = null) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const add = () => {
    if (input) {
      if (!id) {
        dispatch(addNewTodo(input));
      } else {
        dispatch(addTodoTask({ input, todoId: id }));
      }
    }
    setInput("");
  };

  return [input, setInput, add];
}
