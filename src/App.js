import s from "./App.module.scss";
import Todo from "./components/organisms/Todo";
import TodoList from "./components/organisms/TodoList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={s.App}>
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
