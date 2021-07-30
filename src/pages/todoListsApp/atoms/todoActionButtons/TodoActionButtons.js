import { useDispatch } from "react-redux";

import s from "./todoActionButtons.module.scss";
import {
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
} from "../../../../store/todoListsApp/reducers/todoSlice";

const TodoActionButtons = ({ todoListId }) => {
  const dispatch = useDispatch();

  const checkAllHandler = () => dispatch(checkAll({ todoListId }));
  const unCheckAllHandler = () => dispatch(unCheckAll({ todoListId }));
  const removeAllCheckedHandler = () =>
    dispatch(removeAllChecked({ todoListId }));
  const removeAllHandler = () => dispatch(removeAll({ todoListId }));

  return (
    <div className={s.actions}>
      <button onClick={checkAllHandler}>Check All</button>
      <button onClick={unCheckAllHandler}>Uncheck All</button>
      <button onClick={removeAllCheckedHandler}>Remove All Checked</button>
      <button onClick={removeAllHandler}>Remove All</button>
    </div>
  );
};

export default TodoActionButtons;
