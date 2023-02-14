import { HAMBURGER_NAV } from "../types";

const initialState = {
  showingHamburgerNav: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case HAMBURGER_NAV:
      return {
        ...state,
        showingHamburgerNav: !state.showingHamburgerNav,
      };

    default:
      return state;
  }
}

export default modalReducer;
