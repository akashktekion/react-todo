import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TodoLists from "./molecules/todoLists";
import TodoList from "./molecules/todoList";

const TodoListApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/todo/:id" component={TodoList} />
        <Route path="/" component={TodoLists} />
      </Switch>
    </Router>
  );
};

export default TodoListApp;
