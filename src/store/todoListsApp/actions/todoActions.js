import {
  ADD_TODO_ITEM,
  ADD_TODO_LIST,
  CHECK_ALL,
  REMOVE_ALL,
  REMOVE_ALL_CHECKED,
  REMOVE_ONE,
  TOGGLE_TASK_COMPLETED,
  UNCHECK_ALL,
} from "./actionTypes";

export const addTodoList = (input) => ({
  type: ADD_TODO_LIST,
  payload: { input },
});

export const addTodoItem = (input, todoListId) => ({
  type: ADD_TODO_ITEM,
  payload: { input, todoListId },
});

export const removeOne = (todoListId, todoItemId) => ({
  type: REMOVE_ONE,
  payload: { todoListId, todoItemId },
});

export const toggleTaskCompleted = (todoListId, todoItemId) => ({
  type: TOGGLE_TASK_COMPLETED,
  payload: { todoListId, todoItemId },
});

export const checkAll = (todoListId) => ({
  type: CHECK_ALL,
  payload: { todoListId },
});

export const uncheckAll = (todoListId) => ({
  type: UNCHECK_ALL,
  payload: { todoListId },
});

export const removeAllChecked = (todoListId) => ({
  type: REMOVE_ALL_CHECKED,
  payload: { todoListId },
});

export const removeAll = (todoListId) => ({
  type: REMOVE_ALL,
  payload: { todoListId },
});
