import { connect } from "react-redux";
import { Component } from "react";
import PropTypes from "prop-types";

import s from "./inputWithSubmit.module.scss";
import {
  addTodoList,
  addTodoItem,
  setInputText,
  updateTodoItem,
  setEditingItemId,
} from "../../../../store/todoListsApp/actions/createTodoActions";
import {
  ADD_TODO_LIST,
  ADD_TODO_ITEM,
  UPDATE_TODO_ITEM,
} from "../../../../store/todoListsApp/actions/actionTypes";
import { getInputText } from "../../../../store/todoListsApp/selectors/todoSelectors";

class InputWithSubmit extends Component {
  render() {
    const {
      input,
      setInputText,
      addTodoList,
      addTodoItem,
      updateTodoItem,
      setEditingItemId,
      actionType,
      todoListId = null,
      todoItemId = null,
    } = this.props;

    const changeHandler = (e) => setInputText(e.target.value);
    const submitHandler = (e) => {
      if (input && e.key === "Enter") {
        switch (actionType) {
          case ADD_TODO_LIST:
            addTodoList(input);
            setInputText("");
            break;
          case ADD_TODO_ITEM:
            addTodoItem(input, todoListId);
            setInputText("");
            break;
          case UPDATE_TODO_ITEM:
            updateTodoItem(input, todoListId, todoItemId);
            setInputText("");
            break;
          default:
            break;
        }
      }
    };

    const cancelHandler = (e) => {
      if (e.target.id === "cancelBtn") {
        setEditingItemId("");
        setInputText("");
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
        <button id="addNew" className={s.addNew} onClick={submitHandler}>
          &#43; {actionType === "updateTodoItem" ? "Update This" : "Add New"}
        </button>
        {actionType === "updateTodoItem" && (
          <button id="cancelBtn" onClick={cancelHandler}>
            Cancel
          </button>
        )}
      </div>
    );
  }
}

InputWithSubmit.propTypes = {
  input: PropTypes.string.isRequired,
  setInputText: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  addTodoItem: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  setEditingItemId: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  todoListId: PropTypes.string,
  todoItemId: PropTypes.string,
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
