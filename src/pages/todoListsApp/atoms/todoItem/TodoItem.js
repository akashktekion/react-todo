import { useCallback } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  removeTodo,
  toggleTaskCompleted,
  setInputText,
  setEditingItemId,
} from "../../../../store/todoListsApp/actions/createTodoActions";
import s from "./todoItem.module.scss";

const TodoItem = ({
  todoListId,
  todoItem,
  removeTodo,
  toggleTaskCompleted,
  setInputText,
  setEditingItemId,
}) => {
  const checkBoxToggleHandler = useCallback(
    () => toggleTaskCompleted(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, toggleTaskCompleted]
  );

  const removeBtnHandler = useCallback(
    () => removeTodo(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, removeTodo]
  );

  const editTodoHandler = useCallback(
    (e) => {
      setInputText(todoItem.todoItemName);
      setEditingItemId(todoItem.todoItemId);
    },
    [todoItem.todoItemName, setInputText, setEditingItemId, todoItem.todoItemId]
  );

  return (
    <div className={s.item}>
      <input
        type="checkbox"
        onChange={checkBoxToggleHandler}
        checked={todoItem.isCompleted}
      />
      <span
        className={classNames(s.itemName, {
          [s.striked]: todoItem.isCompleted,
        })}
        onClick={editTodoHandler}
      >
        {todoItem.todoItemName}
      </span>
      <button onClick={removeBtnHandler}>&#9747; Remove</button>
    </div>
  );
};

TodoItem.propTypes = {
  todoListId: PropTypes.string.isRequired,
  todoItem: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
  setInputText: PropTypes.func.isRequired,
  setEditingItemId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeTodo: (todoListId, todoItemId) =>
    dispatch(removeTodo(todoListId, todoItemId)),
  toggleTaskCompleted: (todoListId, todoItemId) =>
    dispatch(toggleTaskCompleted(todoListId, todoItemId)),
  setInputText: (input) => dispatch(setInputText(input)),
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
