import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import s from "./todoLists.module.scss";
import { getTodoLists } from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import useTitle from "../hooks/useTitle";

const TodoLists = ({ todoLists }) => {
  const history = useHistory();

  const goToTodoList = useCallback(
    (id, name) => {
      history.push(`/todo/${id}/${name}`);
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
            <div
              onClick={goToTodoList.bind(
                this,
                todoList.todoListId,
                todoList.todoListName
              )}
              key={todoList.todoListId}
              className={s.todoListCard}
            >
              {todoList.todoListName}
            </div>
          ))}

        {todoLists.length === 0 && <p>No TODOS Yet!</p>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const todoLists = getTodoLists(state);
  return { todoLists };
};

export default connect(mapStateToProps)(TodoLists);
