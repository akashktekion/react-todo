import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addNewTodo: (state, action) => {
      const newTodo = { id: "" + Date.now(), title: action.payload, tasks: [] };
      state.todos.push(newTodo);
    },
    addTodoTask: (state, action) => {
      const newTask = {
        id: "" + Date.now(),
        task: action.payload.input,
        isCompleted: false,
      };
      state.todos.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks.push(newTask);
        }
        return item;
      });
    },
    checkAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks.map((item) => (item.isCompleted = true));
        }
        return item;
      });
    },
    unCheckAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks.map((item) => (item.isCompleted = false));
        }
        return item;
      });
    },
    removeAllChecked: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks = item.tasks.filter((item) => !item.isCompleted);
        }
        return item;
      });
    },
    removeAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.id) {
          item.tasks = [];
        }
        return item;
      });
    },
  },
});

export const getTodos = (state) => state.todos.todos;
export const getTodo = (state, id) =>
  state.todos.todos.filter((item) => item.id === id)[0];
export const getTasks = (state, todoId) =>
  state.todos.todos.filter((item) => item.id === todoId)[0].tasks;

export const {
  addNewTodo,
  addTodoTask,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
} = todosSlice.actions;
export default todosSlice.reducer;
