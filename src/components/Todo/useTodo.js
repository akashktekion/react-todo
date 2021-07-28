import { useState, useCallback } from "react";

export default function useTodo() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const add = useCallback(() => {
    if (input) {
      const newList = [...list];
      newList.push({ id: Date.now(), task: input, isCompleted: false });
      setList(newList);
      setInput("");
    }
  }, [input, list]);

  const remove = useCallback(
    (item) => {
      const newList = list.filter((el) => el.id !== item.id);
      setList(newList);
    },
    [list]
  );

  const update = useCallback(
    (item) => {
      const newList = list.map((el) => {
        if (el.id === item.id) {
          el.isCompleted = !el.isCompleted;
        }
        return el;
      });

      setList(newList);
    },
    [list]
  );

  const checkAll = useCallback(() => {
    const newList = list.map((item) => {
      item.isCompleted = true;
      return item;
    });
    setList(newList);
  }, [list]);

  const unCheckAll = useCallback(() => {
    const newList = list.map((item) => {
      item.isCompleted = false;
      return item;
    });
    setList(newList);
  }, [list]);

  const removeAllChecked = useCallback(() => {
    const newList = list.filter((item) => !item.isCompleted);
    setList(newList);
  }, [list]);

  const removeAll = useCallback(() => {
    setList([]);
  }, []);

  return [
    list,
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
