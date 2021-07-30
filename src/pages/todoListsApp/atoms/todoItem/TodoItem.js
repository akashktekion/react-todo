import { useDispatch } from "react-redux";
import classNames from "classnames";

import s from "./todoItem.module.scss";
import {
  removeOne,
  toggleTaskCompleted,
} from "../../../../store/reducers/todoSlice";

const TodoItem = ({ todoListId, todoItem }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.item} key={todoItem.todoItemId}>
      <input
        type="checkbox"
        onChange={(e) =>
          dispatch(
            toggleTaskCompleted({
              todoListId,
              todoItemId: todoItem.todoItemId,
            })
          )
        }
        checked={todoItem.isCompleted}
      />
      <span
        className={classNames(s.itemName, {
          [s.striked]: todoItem.isCompleted,
        })}
      >
        {todoItem.todoItemName}
      </span>
      <button
        onClick={() =>
          dispatch(removeOne({ todoListId, todoItemId: todoItem.todoItemId }))
        }
      >
        Remove
      </button>
    </div>
  );
};

export default TodoItem;
