import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../atoms/Input";
import { getTodos } from "../../../store/todoSlice";
import s from "./todoList.module.scss";
import useInput from "../../atoms/Input/useInput";

const TodoList = () => {
  const todos = useSelector(getTodos);

  const [input, setInput, add] = useInput();

  return (
    <div>
      <Input input={input} setInput={setInput} add={add} />
      <div>
        {todos &&
          todos.map((todo) => (
            <Link to={`/todo/${todo.id}`} key={todo.id}>
              <div className={s.todoCard}>{todo.title}</div>
            </Link>
          ))}

        {todos.length === 0 && <p>No TODOS Yet!</p>}
      </div>
    </div>
  );
};

export default TodoList;
