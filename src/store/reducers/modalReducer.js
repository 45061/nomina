import {
  LOGIN_NAV,
  HIDDE_LOGIN_NAV,
  SHOW_REGISTER_FORM,
  HIDDE_REGISTER_FORM,
  WORKER_REGISTER_FORM,
  WORKER_DAY_FORM,
  EDIT_WORKER_FORM,
  EDIT_WORKER_DAY,
  PLACE_OF_WORKER,
  PLACE_OF_RECIDENCE,
  ROUTE_OF_COST,
  EDIT_ROUTE_OF_COST,
} from "../types";

const initialState = {
  showingLoginNav: false,
  showingRegisterForm: false,
  showingWorkerRegisterForm: false,
  showingWorkerDayForm: false,
  showingEditWorker: false,
  showingEditWorkerDay: false,
  showingPlaceWorkerDay: false,
  showingPlaceRecidence: false,
  showingRouteCost: false,
  showingEditRouteCost: false,
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
    case EDIT_WORKER_DAY:
      return {
        ...state,
        showingEditWorkerDay: !state.showingEditWorkerDay,
      };
    case PLACE_OF_WORKER:
      return {
        ...state,
        showingPlaceWorkerDay: !state.showingPlaceWorkerDay,
      };
    case PLACE_OF_RECIDENCE:
      return {
        ...state,
        showingPlaceRecidence: !state.showingPlaceRecidence,
      };
    case ROUTE_OF_COST:
      return {
        ...state,
        showingRouteCost: !state.showingRouteCost,
      };
    case EDIT_ROUTE_OF_COST:
      return {
        ...state,
        showingEditRouteCost: !state.showingEditRouteCost,
      };

    default:
      return state;
  }
}
export default modalReducer;
