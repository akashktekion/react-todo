import Input from "../Input";
import Tasks from "./Tasks";
import TodoButtons from "./TodoButtons";
import useTodo from "./useTodo";

const Todo = () => {
  const [
    tasks,
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
    <div>
      <Input input={input} setInput={setInput} add={add} />
      <Tasks tasks={tasks} remove={remove} update={update} />
      {tasks.length > 0 && (
        <TodoButtons
          checkAll={checkAll}
          unCheckAll={unCheckAll}
          removeAllChecked={removeAllChecked}
          removeAll={removeAll}
        />
      )}
    </div>
  );
};

export default Todo;
