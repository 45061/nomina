import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import workerReducer from "./workerReducer";

export default combineReducers({
  modalReducer,
  authReducer,
  workerReducer,
});
