import { useState } from "react";
import Input from "../Input/Input";
import Items from "../Items/Items";
import "./TodoItem.css";

const TodoItem = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const add = () => {
    if (input) {
      const newList = [...list];
      newList.push({ id: Date.now(), task: input, isCompleted: false });
      setList(newList);
      setInput("");
    }
  };

  const remove = (item) => {
    const newList = list.filter((el) => el.id !== item.id);
    setList(newList);
  };

  const update = (item) => {
    const newList = list.map((el) => {
      if (el.id === item.id) {
        el.isCompleted = !el.isCompleted;
      }
      return el;
    });

    setList(newList);
  };

  const checkAll = () => {
    const newList = list.map((item) => {
      item.isCompleted = true;
      return item;
    });
    setList(newList);
  };

  const unCheckAll = () => {
    const newList = list.map((item) => {
      item.isCompleted = false;
      return item;
    });
    setList(newList);
  };

  const removeAllChecked = () => {
    const newList = list.filter((item) => !item.isCompleted);
    setList(newList);
  };

  const removeAll = () => {
    setList([]);
  };

  return (
    <div className="todo">
      <Input input={input} setInput={setInput} add={add} />
      <Items list={list} remove={remove} update={update} />
      <div className="actions">
        <button className="check-all" onClick={checkAll}>
          Check All
        </button>
        <button className="uncheck-all" onClick={unCheckAll}>
          Uncheck All
        </button>
        <button className="remove-all-checked" onClick={removeAllChecked}>
          Remove All Checked
        </button>
        <button className="remove-all" onClick={removeAll}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
