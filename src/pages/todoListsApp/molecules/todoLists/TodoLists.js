import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";
import PropTypes from "prop-types";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import {
  getInputText,
  getTodoLists,
} from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import useTitle from "../hooks/useTitle";
import TodoListsItem from "../../atoms/todoListsItem/TodoListsItem";
import {
  addTodoList,
  setInputText,
} from "../../../../store/todoListsApp/actions/createTodoActions";

const TodoLists = ({ todoLists, input, setInputText, addTodoList }) => {
  const history = useHistory();

  const goToTodoList = useCallback(
    (id) => {
      history.push(`/todo/${id}`);
    },
    [history]
  );

  useTitle(`TodoLists | React`);

  const submitHandler = (e) => {
    if (input && e.key === "Enter") {
      addTodoList(input);
      setInputText("");
    }
  };

  return (
    <div>
      <InputWithSubmit
        submitHandler={submitHandler}
        actionType={actions.ADD_TODO_LIST}
      />
      <div>
        {todoLists &&
          todoLists.map((todoList) => (
            <TodoListsItem
              key={todoList.todoListId}
              todoList={todoList}
              goToTodoList={goToTodoList}
            />
          ))}

        {todoLists.length === 0 && <p>No TODOS Yet!</p>}
      </div>
    </div>
  );
};

TodoLists.propTypes = {
  input: PropTypes.string,
  todoLists: PropTypes.array,
  setInputText: PropTypes.func,
  addTodoList: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setInputText: (input) => dispatch(setInputText(input)),
  addTodoList: (input) => dispatch(addTodoList(input)),
});

const mapStateToProps = (state) => {
  const todoLists = getTodoLists(state);
  const input = getInputText(state);
  return { todoLists, input };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
