import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../../atoms/inputWithSubmit";
import { getTodoLists } from "../../../../store/todoListsApp/reducers/todoSlice";
import s from "./todoLists.module.scss";
import useInput from "../hooks/useInput";

const TodoLists = () => {
  const todoLists = useSelector(getTodoLists);

  const [input, setInput, add] = useInput();

  return (
    <div>
      <Input input={input} setInput={setInput} add={add} />
      <div>
        {todoLists &&
          todoLists.map((todoList) => (
            <Link to={`/todo/${todoList.todoListId}`} key={todoList.todoListId}>
              <div className={s.todoListCard}>{todoList.todoListName}</div>
            </Link>
          ))}

        {todoLists.length === 0 && <p>No TODOS Yet!</p>}
      </div>
    </div>
  );
};

export default TodoLists;
