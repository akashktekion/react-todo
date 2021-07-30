import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todoListsApp",
  initialState: {
    todoLists: [
      {
        todoListId: "" + Date.now(),
        todoListName: "TodoList 1",
        todoItems: [
          {
            todoItemId: "" + Date.now(),
            todoItemName: "TodoItem 1",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  reducers: {
    addTodoList: (state, action) => {
      const newTodoList = {
        todoListId: "" + Date.now(),
        todoListName: action.payload,
        todoItems: [],
      };
      state.todoLists.push(newTodoList);
    },
    addTodoItem: (state, action) => {
      const newTodoItem = {
        todoItemId: "" + Date.now(),
        todoItemName: action.payload.input,
        isCompleted: false,
      };
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems.push(newTodoItem);
        }
        return todoList;
      });
    },
    checkAll: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems.map((todoItem) => (todoItem.isCompleted = true));
        }
        return todoList;
      });
    },
    unCheckAll: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems.map((todoItem) => (todoItem.isCompleted = false));
        }
        return todoList;
      });
    },
    removeAllChecked: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems = todoList.todoItems.filter(
            (todoItem) => !todoItem.isCompleted
          );
        }
        return todoList;
      });
    },
    removeAll: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems = [];
        }
        return todoList;
      });
    },
    removeOne: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems = todoList.todoItems.filter(
            (todoItem) => todoItem.todoItemId !== action.payload.todoItemId
          );
        }
        return todoList;
      });
    },
    toggleTaskCompleted: (state, action) => {
      state.todoLists.map((todoList) => {
        if (todoList.todoListId === action.payload.todoListId) {
          todoList.todoItems = todoList.todoItems.map((todoItem) => {
            if (todoItem.todoItemId === action.payload.todoItemId) {
              todoItem.isCompleted = !todoItem.isCompleted;
            }
            return todoItem;
          });
        }
        return todoList;
      });
    },
  },
});

export default todosSlice.reducer;

export const getTodoLists = (state) => state.todoListsApp.todoLists;
export const getTodoList = (state, payload) =>
  state.todoListsApp.todoLists.filter(
    (todoList) => todoList.todoListId === payload.todoListId
  )[0];
export const getTodoItems = (state, payload) =>
  state.todoListsApp.todoLists.filter(
    (todoList) => todoList.todoListId === payload.todoListId
  )[0].todoItems;

export const {
  addTodoList,
  addTodoItem,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
  removeOne,
  toggleTaskCompleted,
} = todosSlice.actions;
