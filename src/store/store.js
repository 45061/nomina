import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

// creating store
export const store = createStore(rootReducer);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
