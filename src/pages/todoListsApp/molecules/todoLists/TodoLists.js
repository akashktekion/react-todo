import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import {
  getTodoLists,
  getLoadingState,
  getErrorState,
} from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import useTitle from "../hooks/useTitle";
import TodoListsItem from "../../atoms/todoListsItem/TodoListsItem";
import {
  addTodoList,
  fetchData,
} from "../../../../store/todoListsApp/actions/createTodoActions";

const TodoLists = ({ todoLists, loading, error, addTodoList, fetchData }) => {
  const history = useHistory();

  const goToTodoList = useCallback(
    (id) => {
      history.push(`/todo/${id}`);
    },
    [history]
  );

  useTitle(`TodoLists | React`);

  const submitHandler = (input) => {
    addTodoList(input);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <InputWithSubmit
        submitHandler={submitHandler}
        actionType={actions.ADD_TODO_LIST}
      />
      <div>
        {loading && <p>Loading...</p>}

        {!loading &&
          todoLists &&
          todoLists.map((todoList) => (
            <TodoListsItem
              key={todoList.todoListId}
              todoList={todoList}
              goToTodoList={goToTodoList}
            />
          ))}

        {!loading && !error && todoLists.length === 0 && <p>No TODOS Yet!</p>}
        {!loading && error && <p>Something Went Wrong!</p>}
      </div>
    </div>
  );
};

TodoLists.defaultProps = {
  todoLists: [],
  loading: false,
  error: "",
  addTodoList: () => {},
  fetchData: () => {},
};

TodoLists.propTypes = {
  todoLists: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  addTodoList: PropTypes.func,
  fetchData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  addTodoList: (input) => dispatch(addTodoList(input)),
  fetchData: () => dispatch(fetchData()),
});

const mapStateToProps = (state) => {
  const todoLists = getTodoLists(state);
  const loading = getLoadingState(state);
  const error = getErrorState(state);
  return { todoLists, loading, error };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
