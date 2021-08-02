import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import s from "./todoLists.module.scss";
import { getTodoLists } from "../../../../store/todoListsApp/selectors/todoSelectors";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";

const TodoLists = ({ todoLists }) => {
  return (
    <div>
      <InputWithSubmit actionType={actions.ADD_TODO_LIST} />
      <div>
        {todoLists &&
          todoLists.map((todoList) => (
            <Link to={`/todo/${todoList.todoListId}`} key={todoList.todoListId}>
              <div className={s.todoListCard}>{todoList.todoListName}</div>
            </Link>
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
