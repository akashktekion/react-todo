// import { createSelector } from "reselect";

export const getTodoLists = (store) =>
  Object.values(store.todoLists.todoLists || []);
export const getTodoListById = (store, todoListId) =>
  store.todoLists.todoLists[todoListId] || {};
export const getTodoList = (store, todoListId) =>
  Object.values(store.todoLists.todoItems[todoListId] || []);
export const getInputText = (store) => store.todoLists.input || "";
export const getEditingItemId = (store) => store.todoLists.editingItemId || "";

// export const getTodoItems = (store, todoListId) =>
//   store.todoLists.todoLists.filter(
//     (todoList) => todoList.todoListId === todoListId
//   )[0].todoItems;
