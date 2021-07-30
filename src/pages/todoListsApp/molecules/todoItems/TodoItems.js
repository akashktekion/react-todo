import { useSelector } from "react-redux";

import s from "./todoItems.module.scss";
import { getTodoItems } from "../../../../store/todoListsApp/reducers/todoSlice";
import TodoItem from "../../atoms/todoItem";

const TodoItems = ({ todoListId }) => {
  const todoItems = useSelector((state) => getTodoItems(state, { todoListId }));

  return (
    <div className={s.items}>
      {todoItems.length > 0 &&
        todoItems.map((todoItem) => (
          <TodoItem
            key={todoItem.todoItemId}
            todoListId={todoListId}
            todoItem={todoItem}
          />
        ))}

      {todoItems.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

export default TodoItems;
