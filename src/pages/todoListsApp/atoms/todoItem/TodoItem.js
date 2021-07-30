import { useDispatch } from "react-redux";
import classNames from "classnames";

import s from "./todoItem.module.scss";
import {
  removeOne,
  toggleTaskCompleted,
} from "../../../../store/todoListsApp/reducers/todoSlice";

const TodoItem = ({ todoListId, todoItem }) => {
  const dispatch = useDispatch();

  const checkBoxToggleHandler = (e) =>
    dispatch(
      toggleTaskCompleted({
        todoListId,
        todoItemId: todoItem.todoItemId,
      })
    );

  const removeBtnHandler = () =>
    dispatch(removeOne({ todoListId, todoItemId: todoItem.todoItemId }));

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

export default TodoItem;
