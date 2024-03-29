import {
  LOGIN_NAV,
  HIDDE_LOGIN_NAV,
  HIDDE_REGISTER_FORM,
  SHOW_REGISTER_FORM,
  WORKER_REGISTER_FORM,
  WORKER_DAY_FORM,
  EDIT_WORKER_FORM,
  EDIT_WORKER_DAY,
  PLACE_OF_WORKER,
  PLACE_OF_RECIDENCE,
  ROUTE_OF_COST,
  EDIT_ROUTE_OF_COST,
  REPORT_FORM,
} from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showLoginNav = () => actionBody(LOGIN_NAV);
export const hiddeLoginNav = () => actionBody(HIDDE_LOGIN_NAV);
export const showRegisterForm = () => actionBody(SHOW_REGISTER_FORM);
export const hiddeRegisterForm = () => actionBody(HIDDE_REGISTER_FORM);
export const workerRegisterForm = () => actionBody(WORKER_REGISTER_FORM);
export const workerDayForm = () => actionBody(WORKER_DAY_FORM);
export const editWorkerForm = () => actionBody(EDIT_WORKER_FORM);
export const editWorkerDay = () => actionBody(EDIT_WORKER_DAY);
export const placeWorkerDay = () => actionBody(PLACE_OF_WORKER);
export const placeRecidence = () => actionBody(PLACE_OF_RECIDENCE);
export const routeCost = () => actionBody(ROUTE_OF_COST);
export const editRouteCost = () => actionBody(EDIT_ROUTE_OF_COST);
export const reportForm = () => actionBody(REPORT_FORM);
