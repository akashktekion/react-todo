import s from "./app.module.scss";
import TodoListApp from "../../todoListsApp";

function App() {
  return (
    <div className={s.app}>
      <h3>My Todos App</h3>
      <TodoListApp />
    </div>
  );
}

export default App;
