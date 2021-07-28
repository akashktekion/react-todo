import s from "./todoButtons.module.scss";

const TodoButtons = ({ checkAll, unCheckAll, removeAllChecked, removeAll }) => {
  return (
    <div className={s.actions}>
      <button onClick={checkAll}>Check All</button>
      <button onClick={unCheckAll}>Uncheck All</button>
      <button onClick={removeAllChecked}>Remove All Checked</button>
      <button onClick={removeAll}>Remove All</button>
    </div>
  );
};

export default TodoButtons;
