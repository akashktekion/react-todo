import * as actions from "../actions/actionTypes";

const initialState = {
  todoLists: {
    1: { todoListId: "1", todoListName: "TodoList1" },
    2: { todoListId: "2", todoListName: "TodoList2" },
  },
  todoItems: {
    1: {
      1: {
        todoItemId: "1",
        todoItemName: "TodoItem1",
        isCompleted: false,
      },
      2: {
        todoItemId: "2",
        todoItemName: "TodoItem2",
        isCompleted: true,
      },
    },
  },
};

export default function todoReducers(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TODO_LIST:
      return {
        ...state,
        todoLists: {
          ...state.todoLists,
          ["" + Date.now()]: {
            todoListId: "" + Date.now(),
            todoListName: action.payload.input,
          },
        },
      };
    case actions.ADD_TODO_ITEM: {
      const todoItems = { ...state.todoItems[action.payload.todoListId] };
      todoItems["" + Date.now()] = {
        todoItemId: "" + Date.now(),
        todoItemName: action.payload.input,
        isCompleted: false,
      };
      return {
        ...state,
        todoItems: {
          ...state.todoItems,
          [action.payload.todoListId]: JSON.parse(JSON.stringify(todoItems)),
        },
      };
    }
    case actions.CHECK_ALL: {
      const todoItems = { ...state.todoItems[action.payload.todoListId] };
      for (const item in todoItems) {
        if (Object.hasOwnProperty.call(todoItems, item)) {
          todoItems[item].isCompleted = true;
        }
      }
      return {
        ...state,
        todoItems: {
          ...state.todoItems,
          [action.payload.todoListId]: JSON.parse(JSON.stringify(todoItems)),
        },
      };
    }
    case actions.UNCHECK_ALL: {
      const todoItems = { ...state.todoItems[action.payload.todoListId] };
      for (const item in todoItems) {
        if (Object.hasOwnProperty.call(todoItems, item)) {
          todoItems[item].isCompleted = false;
        }
      }
      return {
        ...state,
        todoItems: {
          ...state.todoItems,
          [action.payload.todoListId]: JSON.parse(JSON.stringify(todoItems)),
        },
      };
    }
    case actions.REMOVE_ALL_CHECKED: {
      const todoItems = { ...state.todoItems[action.payload.todoListId] };
      for (const item in todoItems) {
        if (Object.hasOwnProperty.call(todoItems, item)) {
          if (todoItems[item].isCompleted) {
            delete todoItems[item];
          }
        }
      }
      return {
        ...state,
        todoItems: {
          ...state.todoItems,
          [action.payload.todoListId]: JSON.parse(JSON.stringify(todoItems)),
        },
      };
    }
    case actions.REMOVE_ALL: {
      const todoItems = { ...state.todoItems };
      delete todoItems[action.payload.todoListId];
      return { ...state, todoItems: JSON.parse(JSON.stringify(todoItems)) };
    }
    case actions.REMOVE_ONE: {
      const todoItems = { ...state.todoItems };
      delete todoItems[action.payload.todoListId][action.payload.todoItemId];
      return { ...state, todoItems: JSON.parse(JSON.stringify(todoItems)) };
    }
    case actions.TOGGLE_TASK_COMPLETED: {
      const todoItems = { ...state.todoItems };
      todoItems[action.payload.todoListId][
        action.payload.todoItemId
      ].isCompleted =
        !todoItems[action.payload.todoListId][action.payload.todoItemId]
          .isCompleted;
      return { ...state, todoItems: JSON.parse(JSON.stringify(todoItems)) };
    }
    default:
      return state;
  }
}
