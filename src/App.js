import s from "./App.module.scss";
import Todo from "./components/organisms/Todo";

function App() {
  return (
    <div className={s.App}>
      <h1>Todos</h1>
      <Todo />
    </div>
  );
}

export default App;
