import {
  LOGIN_NAV,
  HIDDE_LOGIN_NAV,
  SHOW_REGISTER_FORM,
  HIDDE_REGISTER_FORM,
  WORKER_REGISTER_FORM,
  WORKER_DAY_FORM,
  EDIT_WORKER_FORM,
} from "../types";

const initialState = {
  showingLoginNav: false,
  showingRegisterForm: false,
  showingWorkerRegisterForm: false,
  showingWorkerDayForm: false,
  showingEditWorker: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case LOGIN_NAV:
      return {
        ...state,
        showingLoginNav: true,
        showingRegisterForm: false,
      };
    case HIDDE_LOGIN_NAV:
      return {
        ...state,
        showingLoginNav: false,
      };
    case SHOW_REGISTER_FORM:
      return {
        ...state,
        showingLoginNav: false,
        showingRegisterForm: true,
      };
    case HIDDE_REGISTER_FORM:
      return {
        ...state,
        showingRegisterForm: false,
      };
    case WORKER_REGISTER_FORM:
      return {
        ...state,
        showingWorkerRegisterForm: !state.showingWorkerRegisterForm,
      };
    case WORKER_DAY_FORM:
      return {
        ...state,
        showingWorkerDayForm: !state.showingWorkerDayForm,
      };
    case EDIT_WORKER_FORM:
      return {
        ...state,
        showingEditWorker: !state.showingEditWorker,
      };

    default:
      return state;
  }
}
export default modalReducer;
