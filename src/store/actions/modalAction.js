import {
  LOGIN_NAV,
  HIDDE_LOGIN_NAV,
  HIDDE_REGISTER_FORM,
  SHOW_REGISTER_FORM,
  WORKER_REGISTER_FORM,
  WORKER_DAY_FORM,
} from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showLoginNav = () => actionBody(LOGIN_NAV);
export const hiddeLoginNav = () => actionBody(HIDDE_LOGIN_NAV);
export const showRegisterForm = () => actionBody(SHOW_REGISTER_FORM);
export const hiddeRegisterForm = () => actionBody(HIDDE_REGISTER_FORM);
export const workerRegisterForm = () => actionBody(WORKER_REGISTER_FORM);
export const workerDayForm = () => actionBody(WORKER_DAY_FORM);
