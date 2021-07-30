import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../store/reducers/todoSlice";

export default configureStore({
  reducer: {
    todoListsApp: todosReducer,
  },
});
