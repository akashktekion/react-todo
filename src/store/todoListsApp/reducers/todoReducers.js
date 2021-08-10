import { produce } from "immer";

import * as actions from "../actions/actionTypes";

export default produce((draft, action) => {
  switch (action.type) {
    case actions.ADD_TODO_LIST:
      draft.todoListsMap[draft.nextId] = {
        todoListId: "" + draft.nextId++,
        todoListName: action.payload.input,
        todoItemsMap: {},
      };
      break;
    case actions.ADD_TODO_ITEM:
      draft.todoListsMap[action.payload.todoListId].todoItemsMap[
        "" + Date.now()
      ] = {
        todoItemId: "" + Date.now(),
        todoItemName: action.payload.input,
        isCompleted: false,
      };
      break;
    case actions.CHECK_ALL: {
      const todoItems =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap;
      for (const item in todoItems) {
        if (item in todoItems) {
          todoItems[item].isCompleted = true;
        }
      }
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.UNCHECK_ALL: {
      const todoItems =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap;
      for (const item in todoItems) {
        if (item in todoItems) {
          todoItems[item].isCompleted = false;
        }
      }
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.REMOVE_ALL_CHECKED: {
      const todoItems =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap;
      for (const item in todoItems) {
        if (item in todoItems) {
          if (todoItems[item].isCompleted) {
            delete todoItems[item];
          }
        }
      }
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.REMOVE_ALL: {
      draft.todoListsMap[action.payload.todoListId].todoItemsMap = {};
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.REMOVE_ONE: {
      const todoItems =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap;
      delete todoItems[action.payload.todoItemId];
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.TOGGLE_TASK_COMPLETED: {
      const todoItems =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap;
      todoItems[action.payload.todoItemId].isCompleted =
        !todoItems[action.payload.todoItemId].isCompleted;
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    case actions.SET_INPUT_TEXT: {
      draft.input = action.payload.input;
      break;
    }
    case actions.SET_EDTING_ITEM_ID: {
      if (!action.payload.todoItemId) {
        draft.input = "";
      }
      draft.editingItemId = action.payload.todoItemId;
      break;
    }
    case actions.UPDATE_TODO_ITEM: {
      const todoItem =
        draft.todoListsMap[action.payload.todoListId].todoItemsMap[
          action.payload.todoItemId
        ];
      todoItem.todoItemName = action.payload.input;
      draft.input = "";
      draft.editingItemId = "";
      break;
    }
    default:
      return;
  }
}, {});
