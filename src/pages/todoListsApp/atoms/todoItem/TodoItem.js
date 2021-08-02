import { useCallback } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  removeOne,
  toggleTaskCompleted,
} from "../../../../store/todoListsApp/actions/todoActions";

import s from "./todoItem.module.scss";

const TodoItem = ({ todoListId, todoItem, removeOne, toggleTaskCompleted }) => {
  const checkBoxToggleHandler = useCallback(
    () => toggleTaskCompleted(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, toggleTaskCompleted]
  );

  const removeBtnHandler = useCallback(
    () => removeOne(todoListId, todoItem.todoItemId),
    [todoListId, todoItem.todoItemId, removeOne]
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
      >
        {todoItem.todoItemName}
      </span>
      <button onClick={removeBtnHandler}>Remove</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeOne: (todoListId, todoItemId) =>
    dispatch(removeOne(todoListId, todoItemId)),
  toggleTaskCompleted: (todoListId, todoItemId) =>
    dispatch(toggleTaskCompleted(todoListId, todoItemId)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
