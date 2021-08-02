import { useState } from "react";
import { connect } from "react-redux";

import s from "./inputWithSubmit.module.scss";
import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
} from "../../../../store/todoListsApp/actions/actionTypes";
import {
  addTodoList,
  addTodoItem,
} from "../../../../store/todoListsApp/actions/todoActions";

const InputWithSubmit = ({
  addTodoList,
  addTodoItem,
  actionType,
  todoListId = null,
}) => {
  const [input, setInput] = useState("");

  const changeHandler = (e) => setInput(e.target.value);
  const submitHandler = (e) => {
    if (input && (e.key === "Enter" || e.target.id === "addNew")) {
      switch (actionType) {
        case ADD_TODO_LIST:
          addTodoList(input);
          setInput("");
          break;
        case ADD_TODO_ITEM:
          addTodoItem(input, todoListId);
          setInput("");
          break;
        default:
          break;
      }
    }
  };

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
