import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import TodoItems from "../../molecules/todoItems";
import TodoActionButtons from "../../atoms/todoActionButtons";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import { getTodoList } from "../../../../store/todoListsApp/selectors/todoSelectors";

const TodoList = ({ todoListId, todoList }) => {
  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };
  return (
    <div>
      <h2>{todoList.todoListName}</h2>
      <button className="btn-back" onClick={goBack}>
        Back
      </button>
      <InputWithSubmit
        actionType={actions.ADD_TODO_ITEM}
        todoListId={todoListId}
      />
      <TodoItems todoListId={todoListId} todoList={todoList} />
      {todoList.length > 0 && <TodoActionButtons todoListId={todoListId} />}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const todoList = getTodoList(state, id);
  return { todoListId: id, todoList };
};

export default connect(mapStateToProps)(TodoList);
