import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./TodoItem.css";
import {
  addTodoTask,
  getTodo,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
} from "../../redux/todosSlice";
import Items from "../Items/Items";
import Input from "../Input/Input";

const TodoItem = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");

  const todo = useSelector((state) => getTodo(state, id));
  const dispatch = useDispatch();

  const add = () => {
    if (input) {
      dispatch(addTodoTask({ input, id }));
    }
    setInput(""); // TODO
  };

  return (
    <div className="todo">
      <h2>{todo.title}</h2>
      <Link to={"/"}>
        <button className="btn-back">Back</button>
      </Link>
      <Input input={input} setInput={setInput} add={add} />
      <Items todoId={todo.id} />
      <div className="actions">
        <button className="check-all" onClick={dispatch(checkAll(id))}>
          Check All
        </button>
        <button className="uncheck-all" onClick={dispatch(unCheckAll(id))}>
          Uncheck All
        </button>
        <button
          className="remove-all-checked"
          onClick={dispatch(removeAllChecked(id))}
        >
          Remove All Checked
        </button>
        <button className="remove-all" onClick={dispatch(removeAll(id))}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
