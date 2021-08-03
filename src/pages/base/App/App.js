import s from "./app.module.scss";
import Routes from "../../todoListsApp/routes/routes";

function App() {
  return (
    <div className={s.app}>
      <h3>My Todos App</h3>
      <Routes />
    </div>
  );
}

export default App;
