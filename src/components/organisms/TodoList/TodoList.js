import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../atoms/Input";
import { getTodos } from "../../../store/todoSlice";
import s from "./todoList.module.scss";

const TodoList = () => {
  const todos = useSelector(getTodos);

  return (
    <div>
      <Input />
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
