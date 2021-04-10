import { setCurrentContactListReducer } from "./SetContactListReducer";
import {
  setCurrentUserReducer,
  setActiveContact,
  setMessagesList,
} from "./SetCurrentUserReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  currentContactList: setCurrentContactListReducer,
  currentUser: setCurrentUserReducer,
  activeContact: setActiveContact,
  messageList: setMessagesList,
});
