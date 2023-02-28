import { DAYS_OF_WORKER, DATA_WORKER } from "../types";

const initialState = {
  worker: false,
  daysWorker: false,
};

function workerReducer(state = initialState, action = null) {
  if (action.type === DATA_WORKER) {
    return {
      ...state,
      worker: action.payload,
    };
  }
  if (action.type === DAYS_OF_WORKER) {
    return {
      ...state,
      daysWorker: action.payload,
    };
  }
  return state;
}

export default workerReducer;
