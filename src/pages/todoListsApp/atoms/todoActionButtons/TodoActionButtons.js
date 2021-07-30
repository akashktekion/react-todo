import { useDispatch } from "react-redux";

import s from "./todoActionButtons.module.scss";
import {
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
} from "../../../../store/reducers/todoSlice";

const TodoActionButtons = ({ todoId }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.actions}>
      <button onClick={() => dispatch(checkAll({ todoId }))}>Check All</button>
      <button onClick={() => dispatch(unCheckAll({ todoId }))}>
        Uncheck All
      </button>
      <button onClick={() => dispatch(removeAllChecked({ todoId }))}>
        Remove All Checked
      </button>
      <button onClick={() => dispatch(removeAll({ todoId }))}>
        Remove All
      </button>
    </div>
  );
};

export default TodoActionButtons;
