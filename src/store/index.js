import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
import rootReducers from "./todoListsApp/reducers";

// const store = createStore(rootReducers, applyMiddleware(thunk));
const store = createStore(rootReducers);

export default store;
