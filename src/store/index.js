import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./todoListsApp/reducers";
import { loadState, saveState } from "./todoListsApp/utilities/localStorage";

const persistedState = loadState();
const store = createStore(rootReducers, persistedState, applyMiddleware(thunk));
// const store = createStore(rootReducers, persistedState);
store.subscribe(() => {
  saveState({
    todoListsApp: store.getState().todoListsApp,
  });
});

export default store;
