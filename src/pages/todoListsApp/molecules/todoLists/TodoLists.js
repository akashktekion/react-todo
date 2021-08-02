import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import s from "./todoLists.module.scss";
import { getTodoLists } from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";

const TodoLists = ({ todoLists }) => {
  const history = useHistory();

  const goToTodoList = (id) => {
    history.push(`/todo/${id}`);
  };

  return (
    <div>
      <InputWithSubmit actionType={actions.ADD_TODO_LIST} />
      <div>
        {todoLists &&
          todoLists.map((todoList) => (
            <div
              onClick={goToTodoList.bind(this, todoList.todoListId)}
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
