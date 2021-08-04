import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

import s from "./todoItems.module.scss";
import TodoItem from "../../atoms/todoItem";

const TodoItems = ({ todoListId, todoList, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    todoList.length === 0 ? setIsOpen(false) : setIsOpen(true);
  }, [todoList.length]);

  const handleListCollapse = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={s.items}>
      <h5 className={s.typeText} onClick={handleListCollapse}>
        {isOpen ? <span>&#8648;</span> : <span>&#8650;</span>} {type} List
      </h5>
      <div
        className={classNames(s.itemList, {
          [s.collapsed]: !isOpen,
        })}
      >
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
    </div>
  );
};

export default TodoItems;
