import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";

export default combineReducers({
  modalReducer,
  authReducer,
});
