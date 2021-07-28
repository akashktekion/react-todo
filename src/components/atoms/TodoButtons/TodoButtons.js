import s from "./todoButtons.module.scss";
import { useDispatch } from "react-redux";
import {
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
} from "../../../store/todoSlice";

const TodoButtons = ({ todoId }) => {
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

export default TodoButtons;
