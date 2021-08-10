import { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import s from "./todoActionButtons.module.scss";
import {
  checkAll,
  uncheckAll,
  removeAllChecked,
  removeAll,
} from "../../../../store/todoListsApp/actions/createTodoActions";

const TodoActionButtons = ({
  todoListId,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
}) => {
  const checkAllHandler = useCallback(
    () => checkAll(todoListId),
    [checkAll, todoListId]
  );
  const unCheckAllHandler = useCallback(
    () => unCheckAll(todoListId),
    [unCheckAll, todoListId]
  );
  const removeAllCheckedHandler = useCallback(
    () => removeAllChecked(todoListId),
    [removeAllChecked, todoListId]
  );
  const removeAllHandler = useCallback(
    () => removeAll(todoListId),
    [removeAll, todoListId]
  );

  return (
    <div className={s.actions}>
      <button onClick={checkAllHandler}>&#9745; Check All</button>
      <button onClick={unCheckAllHandler}>&#9744; Uncheck All</button>
      <button onClick={removeAllCheckedHandler}>
        &#9746; Remove All Checked
      </button>
      <button onClick={removeAllHandler}>&#9747; Remove All</button>
    </div>
  );
};

TodoActionButtons.propTypes = {
  todoListId: PropTypes.string.isRequired,
  checkAll: PropTypes.func.isRequired,
  unCheckAll: PropTypes.func.isRequired,
  removeAllChecked: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  checkAll: (todoListId) => dispatch(checkAll(todoListId)),
  unCheckAll: (todoListId) => dispatch(uncheckAll(todoListId)),
  removeAllChecked: (todoListId) => dispatch(removeAllChecked(todoListId)),
  removeAll: (todoListId) => dispatch(removeAll(todoListId)),
});

export default connect(null, mapDispatchToProps)(TodoActionButtons);
