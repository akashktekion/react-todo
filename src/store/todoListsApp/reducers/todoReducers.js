import { produce } from "immer";

import * as actions from "../actions/actionTypes";

export default produce(
  (draft, action) => {
    switch (action.type) {
      case actions.ADD_TODO_LIST:
        draft.todoLists["" + Date.now()] = {
          todoListId: "" + Date.now(),
          todoListName: action.payload.input,
        };
        break;
      case actions.ADD_TODO_ITEM:
        if (!(action.payload.todoListId in draft.todoItems)) {
          draft.todoItems[action.payload.todoListId] = {};
        }
        draft.todoItems[action.payload.todoListId]["" + Date.now()] = {
          todoItemId: "" + Date.now(),
          todoItemName: action.payload.input,
          isCompleted: false,
        };
        break;
      case actions.CHECK_ALL: {
        const todoItems = draft.todoItems[action.payload.todoListId];
        for (const item in todoItems) {
          if (item in todoItems) {
            todoItems[item].isCompleted = true;
          }
        }
        break;
      }
      case actions.UNCHECK_ALL: {
        const todoItems = draft.todoItems[action.payload.todoListId];
        for (const item in todoItems) {
          if (item in todoItems) {
            todoItems[item].isCompleted = false;
          }
        }
        break;
      }
      case actions.REMOVE_ALL_CHECKED: {
        const todoItems = draft.todoItems[action.payload.todoListId];
        for (const item in todoItems) {
          if (item in todoItems) {
            if (todoItems[item].isCompleted) {
              delete todoItems[item];
            }
          }
        }
        break;
      }
      case actions.REMOVE_ALL: {
        const todoItems = draft.todoItems;
        delete todoItems[action.payload.todoListId];
        break;
      }
      case actions.REMOVE_ONE: {
        const todoItems = draft.todoItems;
        delete todoItems[action.payload.todoListId][action.payload.todoItemId];
        break;
      }
      case actions.TOGGLE_TASK_COMPLETED: {
        const todoItems = draft.todoItems;
        todoItems[action.payload.todoListId][
          action.payload.todoItemId
        ].isCompleted =
          !todoItems[action.payload.todoListId][action.payload.todoItemId]
            .isCompleted;
        break;
      }
      default:
        return;
    }
  },
  {
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
  }
);
