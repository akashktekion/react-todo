import s from "./app.module.scss";
import Todo from "../../molecules/Todo";
import TodoList from "../../molecules/TodoList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={s.app}>
      <h3>My Todos App</h3>
      <Router>
        <Switch>
          <Route path="/todo/:id">
            <Todo />
          </Route>
          <Route path="/">
            <TodoList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
