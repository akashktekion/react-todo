import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import TodoItems from "../../molecules/todoItems";
import TodoActionButtons from "../../atoms/todoActionButtons";
import { getTodoList } from "../../../../store/todoListsApp/reducers/todoSlice";
import useInput from "../hooks/useInput";

const TodoList = () => {
  const { id: todoListId } = useParams();
  const todoList = useSelector((state) => getTodoList(state, { todoListId }));

  const [input, setInput, add] = useInput(todoListId);

  return (
    <div>
      <h2>{todoList.todoListName}</h2>
      <Link to={"/"}>
        <button className="btn-back">Back</button>
      </Link>
      <InputWithSubmit input={input} setInput={setInput} add={add} />
      <TodoItems todoListId={todoList.todoListId} />
      {todoList.todoItems.length > 0 && (
        <TodoActionButtons todoListId={todoList.todoListId} />
      )}
    </div>
  );
};

export default TodoList;
