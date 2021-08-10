import { useHistory, useParams } from "react-router-dom";
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
} from "../../../../store/todoListsApp/selectors/todoSelectors";
import useTitle from "../hooks/useTitle";
import { setEditingItemId } from "../../../../store/todoListsApp/actions/createTodoActions";
import TodoLists from "../todoLists";

const TodoList = ({
  todoList,
  completedList,
  pendingList,
  currentTodoList,
  nextTodoList,
  prevTodoList,
  editingItemId,
  setEditingItemId,
}) => {
  const { id } = useParams();
  const history = useHistory();

  const isPrevPresent = Object.keys(prevTodoList).length > 0;
  const isNextPresent = Object.keys(nextTodoList).length > 0;

  const goPrev = useCallback(() => {
    const { todoListId: id } = prevTodoList;
    history.push(`/todo/${id}`);
    setEditingItemId("");
  }, [history, prevTodoList, setEditingItemId]);

  const goBack = useCallback(() => {
    history.push("/");
    setEditingItemId("");
  }, [history, setEditingItemId]);

  const goNext = useCallback(() => {
    const { todoListId: id } = nextTodoList;
    history.push(`/todo/${id}`);
    setEditingItemId("");
  }, [history, nextTodoList, setEditingItemId]);

  useTitle(`${currentTodoList.todoListName} | TodoLists | React`);

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
        actionType={
          editingItemId ? actions.UPDATE_TODO_ITEM : actions.ADD_TODO_ITEM
        }
        todoListId={id}
        todoItemId={editingItemId}
      />
      {todoList.length > 0 && (
        <div>
          <TodoItems todoListId={id} todoList={pendingList} type={"Pending"} />
          <TodoItems
            todoListId={id}
            todoList={completedList}
            type={"Completed"}
          />
          <TodoActionButtons todoListId={id} />
        </div>
      )}
      {todoList.length === 0 && <p>No Tasks Yet!</p>}
    </div>
  );
};

TodoLists.propTypes = {
  todoList: PropTypes.array,
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
  const todoList = getTodoListById(state, id);
  const currentTodoList = getTodoListsById(state, "" + Number(id));
  const nextTodoList = getTodoListsById(state, "" + (Number(id) + 1));
  const prevTodoList = getTodoListsById(state, "" + (Number(id) - 1));
  const completedList = getFilteredTodoListById(state, id, "isCompleted", true);
  const pendingList = getFilteredTodoListById(state, id, "isCompleted", false);
  const editingItemId = getEditingItemId(state);
  return {
    todoListId: id,
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
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
