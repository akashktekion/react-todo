import { useCallback } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  removeOne,
  toggleTaskCompleted,
  setInputText,
  setEditingItemId,
} from "../../../../store/todoListsApp/actions/todoActions";

import s from "./todoItem.module.scss";

const TodoItem = ({
  todoListId,
  todoItem,
  removeOne,
  toggleTaskCompleted,
  setInputText,
  setEditingItemId,
}) => {
  const checkBoxToggleHandler = useCallback(
    () => toggleTaskCompleted(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, toggleTaskCompleted]
  );

  const removeBtnHandler = useCallback(
    () => removeOne(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, removeOne]
  );

  const editTodoHandler = useCallback(
    (e) => {
      setInputText(todoItem.todoItemName);
      setEditingItemId(todoItem.todoItemId);
    },
    [todoItem.todoItemName, setInputText, setEditingItemId, todoItem.todoItemId]
  );

  return (
    <div className={s.item} key={todoItem.todoItemId}>
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

const mapDispatchToProps = (dispatch) => ({
  removeOne: (todoListId, todoItemId) =>
    dispatch(removeOne(todoListId, todoItemId)),
  toggleTaskCompleted: (todoListId, todoItemId) =>
    dispatch(toggleTaskCompleted(todoListId, todoItemId)),
  setInputText: (input) => dispatch(setInputText(input)),
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
