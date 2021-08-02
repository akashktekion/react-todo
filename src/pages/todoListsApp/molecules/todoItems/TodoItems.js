import s from "./todoItems.module.scss";
import TodoItem from "../../atoms/todoItem";

const TodoItems = ({ todoListId, todoList }) => {
  return (
    <div className={s.items}>
      {todoList.length > 0 &&
        todoList.map((todoItem) => (
          <TodoItem
            key={todoItem.todoItemId}
            todoItem={todoItem}
            todoListId={todoListId}
          />
        ))}

      {todoList.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default TodoItems;
