import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";
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
  setEditingItemId,
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
  nextTodoList,
  prevTodoList,
  editingItemId,
  setInputText,
  addTodoItem,
  updateTodoItem,
  setEditingItemId,
}) => {
  const history = useHistory();

  const isPrevPresent = Object.keys(prevTodoList).length > 0;
  const isNextPresent = Object.keys(nextTodoList).length > 0;

  const goPrev = useCallback(() => {
    const { todoListId: prevId } = prevTodoList;
    history.push(`/todo/${prevId}`);
    setEditingItemId("");
  }, [history, prevTodoList, setEditingItemId]);

  const goBack = useCallback(() => {
    history.push("/");
    setEditingItemId("");
  }, [history, setEditingItemId]);

  const goNext = useCallback(() => {
    const { todoListId: nextId } = nextTodoList;
    history.push(`/todo/${nextId}`);
    setEditingItemId("");
  }, [history, nextTodoList, setEditingItemId]);

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

  return (
    <div>
      <h2>{currentTodoList.todoListName}</h2>
      <TodoHistoryButtons
        goBack={goBack}
        goNext={goNext}
        goPrev={goPrev}
        isNextPresent={isNextPresent}
        isPrevPresent={isPrevPresent}
      />
      <InputWithSubmit
        submitHandler={submitHandler}
        actionType={
          editingItemId ? actions.UPDATE_TODO_ITEM : actions.ADD_TODO_ITEM
        }
      />
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
  todoList: PropTypes.array,
  imput: PropTypes.string,
  completedList: PropTypes.array,
  pendingList: PropTypes.array,
  currentTodoList: PropTypes.array,
  nextTodoList: PropTypes.array,
  prevTodoList: PropTypes.array,
  editingItemId: PropTypes.string,
  setEditingItemId: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const input = getInputText(state);
  const todoList = getTodoListById(state, id);
  const currentTodoList = getTodoListsById(state, "" + Number(id));
  const nextTodoList = getTodoListsById(state, "" + (Number(id) + 1));
  const prevTodoList = getTodoListsById(state, "" + (Number(id) - 1));
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
    nextTodoList,
    prevTodoList,
    editingItemId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setInputText: (input) => dispatch(setInputText(input)),
  addTodoItem: (input, todoListId) => dispatch(addTodoItem(input, todoListId)),
  updateTodoItem: (input, todoListId, todoItemId) =>
    dispatch(updateTodoItem(input, todoListId, todoItemId)),
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
