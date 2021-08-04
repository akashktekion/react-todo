import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
import rootReducers from "./todoListsApp/reducers";
import { loadState, saveState } from "./todoListsApp/utilities/localStorage";

// const store = createStore(rootReducers, applyMiddleware(thunk));
const persistedState = loadState();
const store = createStore(rootReducers, persistedState);
store.subscribe(() => {
  saveState({
    todoLists: store.getState().todoLists,
  });
});

export default store;
