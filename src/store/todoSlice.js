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
        if (item.id === action.payload.todoId) {
          item.tasks.push(newTask);
        }
        return item;
      });
    },
    checkAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks.map((item) => (item.isCompleted = true));
        }
        return item;
      });
    },
    unCheckAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks.map((item) => (item.isCompleted = false));
        }
        return item;
      });
    },
    removeAllChecked: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks = item.tasks.filter((item) => !item.isCompleted);
        }
        return item;
      });
    },
    removeAll: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks = [];
        }
        return item;
      });
    },
    removeOne: (state, action) => {
      console.log(action);
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks = item.tasks.filter(
            (task) => task.id !== action.payload.taskId
          );
        }
        return item;
      });
    },
    toggleTaskCompleted: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          item.tasks = item.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.isCompleted = !task.isCompleted;
            }
            return task;
          });
        }
        return item;
      });
    },
  },
});

export const getTodos = (state) => state.todos.todos;
export const getTodo = (state, payload) =>
  state.todos.todos.filter((todo) => todo.id === payload.todoId)[0];
export const getTasks = (state, payload) =>
  state.todos.todos.filter((todo) => todo.id === payload.todoId)[0].tasks;

export const {
  addNewTodo,
  addTodoTask,
  checkAll,
  unCheckAll,
  removeAllChecked,
  removeAll,
  removeOne,
  toggleTaskCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;
