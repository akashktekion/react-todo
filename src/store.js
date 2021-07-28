import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux/todosSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
