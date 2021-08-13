import { useCallback } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  removeTodo,
  toggleTaskCompleted,
  setEditingItemId,
} from "../../../../store/todoListsApp/actions/createTodoActions";
import s from "./todoItem.module.scss";

const TodoItem = ({
  todoListId,
  todoItem,
  updateInput,
  removeTodo,
  toggleTaskCompleted,
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
      updateInput(todoItem.todoItemName);
      setEditingItemId(todoItem.todoItemId);
    },
    [setEditingItemId, todoItem.todoItemId, updateInput, todoItem.todoItemName]
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

TodoItem.defaultProps = {
  todoListId: "",
  todoItem: null,
  updateInput: () => {},
  removeTodo: () => {},
  toggleTaskCompleted: () => {},
  setEditingItemId: () => {},
};

TodoItem.propTypes = {
  todoListId: PropTypes.string.isRequired,
  todoItem: PropTypes.object.isRequired,
  updateInput: PropTypes.func,
  removeTodo: PropTypes.func.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
  setEditingItemId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeTodo: (todoListId, todoItemId) =>
    dispatch(removeTodo(todoListId, todoItemId)),
  toggleTaskCompleted: (todoListId, todoItemId) =>
    dispatch(toggleTaskCompleted(todoListId, todoItemId)),
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
