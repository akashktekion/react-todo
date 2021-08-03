import { useState } from "react";
import { connect } from "react-redux";
import { useCallback } from "react";

import s from "./inputWithSubmit.module.scss";
import {
  addTodoList,
  addTodoItem,
} from "../../../../store/todoListsApp/actions/todoActions";
import useInput from "./hooks/useInput";

const InputWithSubmit = ({
  addTodoList,
  addTodoItem,
  actionType,
  todoListId = null,
}) => {
  const [input, changeHandler, submitHandler] = useInput(
    addTodoList,
    addTodoItem,
    actionType,
    todoListId
  );

  return (
    <div className={s.input}>
      <input
        type="text"
        value={input}
        onChange={changeHandler}
        onKeyDown={submitHandler}
      />
      <button id="addNew" onClick={submitHandler}>
        Add New
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTodoList: (input) => dispatch(addTodoList(input)),
  addTodoItem: (input, todoListId) => dispatch(addTodoItem(input, todoListId)),
});

export default connect(null, mapDispatchToProps)(InputWithSubmit);
