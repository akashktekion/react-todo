import { connect } from "react-redux";

import s from "./inputWithSubmit.module.scss";
import {
  addTodoList,
  addTodoItem,
  setInputText,
  updateTodoItem,
  setEditingItemId,
} from "../../../../store/todoListsApp/actions/todoActions";
import useInput from "./hooks/useInput";
import { getInputText } from "../../../../store/todoListsApp/selectors/todoSelectors";

const InputWithSubmit = ({
  input,
  setInputText,
  addTodoList,
  addTodoItem,
  updateTodoItem,
  setEditingItemId,
  actionType,
  todoListId = null,
  todoItemId = null,
}) => {
  const [changeHandler, submitHandler, cancelHandler] = useInput(
    input,
    setInputText,
    addTodoList,
    addTodoItem,
    updateTodoItem,
    setEditingItemId,
    actionType,
    todoListId,
    todoItemId
  );

  return (
    <div className={s.input}>
      <input
        type="text"
        value={input}
        onChange={changeHandler}
        onKeyDown={submitHandler}
      />
      <button id="addNew" className={s.addNew} onClick={submitHandler}>
        {actionType === "updateTodoItem" ? "Update This" : "Add New"}
      </button>
      {actionType === "updateTodoItem" && (
        <button id="cancelBtn" onClick={cancelHandler}>
          Cancel
        </button>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const input = getInputText(state);
  return { input };
};

const mapDispatchToProps = (dispatch) => ({
  setInputText: (input) => dispatch(setInputText(input)),
  addTodoList: (input) => dispatch(addTodoList(input)),
  addTodoItem: (input, todoListId) => dispatch(addTodoItem(input, todoListId)),
  updateTodoItem: (input, todoListId, todoItemId) =>
    dispatch(updateTodoItem(input, todoListId, todoItemId)),
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputWithSubmit);
