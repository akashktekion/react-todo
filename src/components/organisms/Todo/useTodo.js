import { useState, useCallback } from "react";

export default function useTodo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const add = useCallback(() => {
    if (input) {
      const newTasks = [...tasks];
      newTasks.push({ id: Date.now(), task: input, isCompleted: false });
      setTasks(newTasks);
      setInput("");
    }
  }, [input, tasks]);

  const remove = useCallback(
    (item) => {
      const newTasks = tasks.filter((el) => el.id !== item.id);
      setTasks(newTasks);
    },
    [tasks]
  );

  const update = useCallback(
    (item) => {
      const newTasks = tasks.map((el) => {
        if (el.id === item.id) {
          el.isCompleted = !el.isCompleted;
        }
        return el;
      });

      setTasks(newTasks);
    },
    [tasks]
  );

  const checkAll = useCallback(() => {
    const newTasks = tasks.map((item) => {
      item.isCompleted = true;
      return item;
    });
    setTasks(newTasks);
  }, [tasks]);

  const unCheckAll = useCallback(() => {
    const newTasks = tasks.map((item) => {
      item.isCompleted = false;
      return item;
    });
    setTasks(newTasks);
  }, [tasks]);

  const removeAllChecked = useCallback(() => {
    const newTasks = tasks.filter((item) => !item.isCompleted);
    setTasks(newTasks);
  }, [tasks]);

  const removeAll = useCallback(() => {
    setTasks([]);
  }, []);

  return [
    tasks,
    input,
    setInput,
    add,
    remove,
    update,
    checkAll,
    unCheckAll,
    removeAllChecked,
    removeAll,
  ];
}
