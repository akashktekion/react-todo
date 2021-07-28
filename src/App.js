import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addNewTodo = () => {
    if (input) {
      const newList = [...todos];
      newList.push({ id: Date.now(), title: input, tasks: {} });
      setTodos(newList);
      setInput("");
    }
  };

  return (
    <div className="App">
      <h4>Todos</h4>
      <Router>
        <Switch>
          <Route path="/todo/:id">
            <TodoItem />
          </Route>
          <Route path="/">
            <TodoList
              todos={todos}
              addNewTodo={addNewTodo}
              input={input}
              setInput={setInput}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
