import Input from "../Input";
import Tasks from "../Tasks";
import "./todo.scss";
import useTodo from "./useTodo";

const Todo = () => {
  const [
    list,
    input,
    setInput,
    add,
    remove,
    update,
    checkAll,
    unCheckAll,
    removeAllChecked,
    removeAll,
  ] = useTodo();

  return (
    <div className="todo">
      <Input input={input} setInput={setInput} add={add} />
      <Tasks list={list} remove={remove} update={update} />
      <div className="actions">
        <button className="check-all" onClick={checkAll}>
          Check All
        </button>
        <button className="uncheck-all" onClick={unCheckAll}>
          Uncheck All
        </button>
        <button className="remove-all-checked" onClick={removeAllChecked}>
          Remove All Checked
        </button>
        <button className="remove-all" onClick={removeAll}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default Todo;
