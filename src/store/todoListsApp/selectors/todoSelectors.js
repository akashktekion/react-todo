// import { createSelector } from "reselect";

export const getTodoLists = (store) =>
  Object.values(store.todoListsApp.todoListsMap || []);
export const getTodoListsById = (store, todoListId) =>
  store.todoListsApp.todoListsMap[todoListId] || {};
export const getTodoListById = (store, todoListId) => {
  let todoList = [];
  if (todoListId in store.todoListsApp.todoListsMap) {
    todoList = Object.values(
      store.todoListsApp.todoListsMap[todoListId].todoItemsMap
    );
  }
  return todoList;
};
export const getFilteredTodoListById = (
  store,
  todoListId,
  filter,
  filterValue
) => {
  let todoList = getTodoListById(store, todoListId);
  return todoList.filter((item) => item[filter] === filterValue);
};
export const getEditingItemId = (store) =>
  store.todoListsApp.editingItemId || "";

export const getLoadingState = (store) => store.todoListsApp.loading;
export const getErrorState = (store) => store.todoListsApp.error;
