import { HAMBURGER_NAV } from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showHamburgerNav = () => actionBody(HAMBURGER_NAV);
