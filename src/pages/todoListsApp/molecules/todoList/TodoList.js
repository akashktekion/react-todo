import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useCallback } from "react";

import InputWithSubmit from "../../atoms/inputWithSubmit";
import TodoItems from "../../molecules/todoItems";
import TodoActionButtons from "../../atoms/todoActionButtons";
import * as actions from "../../../../store/todoListsApp/actions/actionTypes";
import {
  getEditingItemId,
  getTodoList,
  getTodoListByFilter,
  getTodoListById,
} from "../../../../store/todoListsApp/selectors/todoSelectors";
import useTitle from "../hooks/useTitle";
import { setEditingItemId } from "../../../../store/todoListsApp/actions/todoActions";
import s from "./todoList.module.scss";

const TodoList = ({
  todoList,
  completedList,
  pendingList,
  nextTodoList,
  prevTodoList,
  editingItemId,
  setEditingItemId,
}) => {
  const { id, name } = useParams();
  const history = useHistory();

  const goPrev = useCallback(() => {
    const { todoListId: id, todoListName: name } = prevTodoList;
    history.push(`/todo/${id}/${name}`);
    setEditingItemId("");
  }, [history, prevTodoList, setEditingItemId]);

  const goBack = useCallback(() => {
    history.push("/");
    setEditingItemId("");
  }, [history, setEditingItemId]);

  const goNext = useCallback(() => {
    const { todoListId: id, todoListName: name } = nextTodoList;
    history.push(`/todo/${id}/${name}`);
    setEditingItemId("");
  }, [history, nextTodoList, setEditingItemId]);

  useTitle(`${name} | TodoLists | React`);

  return (
    <div>
      <h2>{name}</h2>
      <div className={s.historyButtons}>
        <button className="btn-back" onClick={goBack}>
          &#8634; Back
        </button>
        {Object.keys(nextTodoList).length > 0 && (
          <button className="btn-next" onClick={goNext}>
            &#8649; Next
          </button>
        )}
        {Object.keys(prevTodoList).length > 0 > 0 && (
          <button className="btn-prev" onClick={goPrev}>
            &#8647; Prev
          </button>
        )}
      </div>
      <InputWithSubmit
        actionType={
          editingItemId ? actions.UPDATE_TODO_ITEM : actions.ADD_TODO_ITEM
        }
        todoListId={id}
        todoItemId={editingItemId}
      />
      <TodoItems todoListId={id} todoList={pendingList} type={"Pending"} />
      <TodoItems todoListId={id} todoList={completedList} type={"Completed"} />
      {todoList.length > 0 && <TodoActionButtons todoListId={id} />}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const todoList = getTodoList(state, id);
  const completedList = getTodoListByFilter(state, id, "isCompleted", true);
  const pendingList = getTodoListByFilter(state, id, "isCompleted", false);
  const nextTodoList = getTodoListById(state, "" + (Number(id) + 1));
  const prevTodoList = getTodoListById(state, "" + (Number(id) - 1));
  const editingItemId = getEditingItemId(state);
  return {
    todoListId: id,
    todoList,
    completedList,
    pendingList,
    nextTodoList,
    prevTodoList,
    editingItemId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
