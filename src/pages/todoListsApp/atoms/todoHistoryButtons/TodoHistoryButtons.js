import { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import s from "./todoHistoryButtons.module.scss";
import { setEditingItemId } from "../../../../store/todoListsApp/actions/createTodoActions";
import { getTodoListsById } from "../../../../store/todoListsApp/selectors/todoSelectors";

const TodoHistoryButtons = ({
  setEditingItemId,
  prevTodoList,
  nextTodoList,
}) => {
  const history = useHistory();
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

  const isPrevPresent = Object.keys(prevTodoList).length > 0;
  const isNextPresent = Object.keys(nextTodoList).length > 0;

  return (
    <div className={s.historyButtons}>
      <button className="btn-back" onClick={goBack}>
        &#8634; Back
      </button>
      <button className="btn-next" onClick={goNext} disabled={!isNextPresent}>
        &#8649; Next
      </button>
      <button className="btn-prev" onClick={goPrev} disabled={!isPrevPresent}>
        &#8647; Prev
      </button>
    </div>
  );
};

TodoHistoryButtons.defaultProps = {
  setEditingItemId: () => {},
  nextTodoList: null,
  prevTodoList: null,
};

TodoHistoryButtons.propTypes = {
  setEditingItemId: PropTypes.func.isRequired,
  nextTodoList: PropTypes.object.isRequired,
  prevTodoList: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  const todoListId = props.todoListId;
  const nextTodoList = getTodoListsById(state, "" + (Number(todoListId) + 1));
  const prevTodoList = getTodoListsById(state, "" + (Number(todoListId) - 1));
  return {
    nextTodoList,
    prevTodoList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setEditingItemId: (todoItemId) => dispatch(setEditingItemId(todoItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryButtons);
