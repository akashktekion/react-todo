import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addNewTodo, getTodos } from "../../redux/todosSlice";
import Input from "../Input/Input";
import "./TodoList.css";

const TodoList = () => {
  const [input, setInput] = useState("");

  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const add = () => {
    if (input) {
      dispatch(addNewTodo(input));
    }
    setInput(""); // TODO
  };

  return (
    <div className="container">
      <Input input={input} setInput={setInput} add={add} />
      <div className="todos-container">
        {todos &&
          todos.map((todo) => (
            <Link to={`/todo/${todo.id}`} key={todo.id}>
              <div className="todo-card">{todo.title}</div>
            </Link>
          ))}

        {todos.length === 0 && <p>No TODOS Yet!</p>}
      </div>
    </div>
  );
};

export default TodoList;
