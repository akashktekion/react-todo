export const getTodoLists = (store) =>
  Object.values(store.todoLists.todoLists || []);
export const getTodoList = (store, todoListId) =>
  Object.values(store.todoLists.todoItems[todoListId] || []);
export const getTodoItems = (store, todoListId) =>
  store.todoLists.todoLists.filter(
    (todoList) => todoList.todoListId === todoListId
  )[0].todoItems;
