import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";
import PropTypes from "prop-types";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import { getTodoLists } from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import useTitle from "../hooks/useTitle";
import TodoListsItem from "../../atoms/todoListsItem/TodoListsItem";

const TodoLists = ({ todoLists }) => {
  const history = useHistory();

  const goToTodoList = useCallback(
    (id) => {
      history.push(`/todo/${id}`);
    },
    [history]
  );

  useTitle(`TodoLists | React`);

  return (
    <div>
      <InputWithSubmit actionType={actions.ADD_TODO_LIST} />
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
  todoLists: PropTypes.array,
};

const mapStateToProps = (state) => {
  const todoLists = getTodoLists(state);
  return { todoLists };
};

export default connect(mapStateToProps)(TodoLists);
