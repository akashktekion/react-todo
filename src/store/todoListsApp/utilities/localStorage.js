export const loadState = () => {
  try {
    let serializedState = localStorage.getItem("state");
    if (!serializedState) {
      serializedState =
        '{"todoLists":{ "todoLists": {}, "todoItems": {}, "input": "", "editingItemId": "", "nextId": "1" }}';
      localStorage.setItem("state", serializedState);
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};
