import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import TodoItems from "../../molecules/todoItems";
import TodoActionButtons from "../../atoms/todoActionButtons";
import TodoHistoryButtons from "../../atoms/todoHistoryButtons";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import {
  getEditingItemId,
  getTodoListById,
  getTodoListsById,
  getFilteredTodoListById,
  getInputText,
} from "../../../../store/todoListsApp/selectors/todoSelectors";
import useTitle from "../hooks/useTitle";
import {
  addTodoItem,
  setInputText,
  updateTodoItem,
} from "../../../../store/todoListsApp/actions/createTodoActions";
import TodoLists from "../todoLists";

const TodoList = ({
  todoListId,
  todoList,
  input,
  completedList,
  pendingList,
  currentTodoList,
  editingItemId,
  setInputText,
  addTodoItem,
  updateTodoItem,
}) => {
  useTitle(`${currentTodoList.todoListName} | TodoLists | React`);

  const submitHandler = (e) => {
    if (input && (e.key === "Enter" || e.target.id === "addNew")) {
      if (editingItemId) {
        updateTodoItem(input, todoListId, editingItemId);
      } else {
        addTodoItem(input, todoListId);
      }
      setInputText("");
    }
  };

  const type = editingItemId ? actions.UPDATE_TODO_ITEM : actions.ADD_TODO_ITEM;

  return (
    <div>
      <h2>{currentTodoList.todoListName}</h2>
      <TodoHistoryButtons todoListId={todoListId} />
      <InputWithSubmit submitHandler={submitHandler} actionType={type} />
      {todoList.length > 0 && (
        <div>
          <TodoItems
            todoListId={todoListId}
            todoList={pendingList}
            type={"Pending"}
          />
          <TodoItems
            todoListId={todoListId}
            todoList={completedList}
            type={"Completed"}
          />
          <TodoActionButtons todoListId={todoListId} />
        </div>
      )}
      {todoList.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

TodoLists.propTypes = {
  todoListId: PropTypes.string,
  todoList: PropTypes.object,
  input: PropTypes.string,
  completedList: PropTypes.object,
  pendingList: PropTypes.object,
  currentTodoList: PropTypes.object,
  editingItemId: PropTypes.object,
  setInputText: PropTypes.func,
  addTodoItem: PropTypes.func,
  updateTodoItem: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const input = getInputText(state);
  const todoList = getTodoListById(state, id);
  const currentTodoList = getTodoListsById(state, "" + Number(id));
  const completedList = getFilteredTodoListById(state, id, "isCompleted", true);
  const pendingList = getFilteredTodoListById(state, id, "isCompleted", false);
  const editingItemId = getEditingItemId(state);
  return {
    todoListId: id,
    input,
    todoList,
    completedList,
    pendingList,
    currentTodoList,
    editingItemId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setInputText: (input) => dispatch(setInputText(input)),
  addTodoItem: (input, todoListId) => dispatch(addTodoItem(input, todoListId)),
  updateTodoItem: (input, todoListId, todoItemId) =>
    dispatch(updateTodoItem(input, todoListId, todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
