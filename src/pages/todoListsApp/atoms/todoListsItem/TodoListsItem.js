import { useCallback } from "react";
import PropTypes from "prop-types";

import s from "./todoListsItem.module.scss";

const TodoListsItem = ({ todoList, goToTodoList }) => {
  const handleClick = useCallback(() => {
    goToTodoList(todoList.todoListId);
  }, [goToTodoList, todoList.todoListId]);

  return (
    <div onClick={handleClick} className={s.todoListCard}>
      {todoList.todoListName}
    </div>
  );
};

TodoListsItem.propTypes = {
  todoList: PropTypes.object.isRequired,
  goToTodoList: PropTypes.func.isRequired,
};

export default TodoListsItem;
