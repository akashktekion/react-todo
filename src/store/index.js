import { createStore } from "redux";
import rootReducers from "./todoListsApp/reducers";

const store = createStore(rootReducers);

export default store;
