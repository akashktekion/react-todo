import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoListsApp/reducers/todoSlice";

export default configureStore({
  reducer: {
    todoListsApp: todosReducer,
  },
});
