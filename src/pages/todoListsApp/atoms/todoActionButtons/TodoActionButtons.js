import { connect } from "react-redux";
import s from "./todoActionButtons.module.scss";
import {
  checkAll,
  uncheckAll,
  removeAllChecked,
  removeAll,
} from "../../../../store/todoListsApp/actions/todoActions";

const TodoActionButtons = ({
  todoListId,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
}) => {
  const checkAllHandler = () => checkAll(todoListId);
  const unCheckAllHandler = () => unCheckAll(todoListId);
  const removeAllCheckedHandler = () => removeAllChecked(todoListId);
  const removeAllHandler = () => removeAll(todoListId);

  return (
    <div className={s.actions}>
      <button onClick={checkAllHandler}>Check All</button>
      <button onClick={unCheckAllHandler}>Uncheck All</button>
      <button onClick={removeAllCheckedHandler}>Remove All Checked</button>
      <button onClick={removeAllHandler}>Remove All</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkAll: (todoListId) => dispatch(checkAll(todoListId)),
  unCheckAll: (todoListId) => dispatch(uncheckAll(todoListId)),
  removeAllChecked: (todoListId) => dispatch(removeAllChecked(todoListId)),
  removeAll: (todoListId) => dispatch(removeAll(todoListId)),
});

export default connect(null, mapDispatchToProps)(TodoActionButtons);
