import { useSelector } from "react-redux";
import Input from "../../atoms/Input";
import Tasks from "../../atoms/Tasks";
import TodoButtons from "../../atoms/TodoButtons";
import { Link, useParams } from "react-router-dom";
import { getTodo } from "../../../store/todoSlice";
import useInput from "../../atoms/Input/useInput";

const Todo = () => {
  const { id } = useParams();
  const todo = useSelector((state) => getTodo(state, { todoId: id }));

  const [input, setInput, add] = useInput(id);

  return (
    <div>
      <h2>{todo.title}</h2>
      <Link to={"/"}>
        <button className="btn-back">Back</button>
      </Link>
      <Input input={input} setInput={setInput} add={add} />
      <Tasks todoId={todo.id} />
      {todo.tasks.length > 0 && <TodoButtons todoId={todo.id} />}
    </div>
  );
};

export default Todo;
