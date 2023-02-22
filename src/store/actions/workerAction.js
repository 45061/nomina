import axios from "axios";
import {
  editWorkerDay,
  editWorkerForm,
  workerDayForm,
  workerRegisterForm,
} from "./modalAction";

export const registerWorker = (body) => async (dispatch) => {
  try {
    // const cookies = new Cookies();
    const response = await axios.post("/api/workers/register", body);

    // const { token, message, ...user } = response;
    // cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // toast.success("Usuario registrado con exito");
    dispatch(workerRegisterForm());
    // dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en register, no entra");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Error en el registro");
  }
};

export const registerDayWorker = (body) => async (dispatch) => {
  try {
    // const cookies = new Cookies();
    const response = await axios.post("/api/daysWorkers/register", body);

    if (response.status === 201) {
      dispatch(workerDayForm());
    }

    // const { token, message, ...user } = response;
    // cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // toast.success("Usuario registrado con exito");
    // dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en register, no entra");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Error en el registro");
  }
};

export const putWorker = (body) => async (dispatch) => {
  try {
    // const cookies = new Cookies();
    const response = await axios.put("/api/workers/register", body);

    // const { token, message, ...user } = response;
    // cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // toast.success("Usuario registrado con exito");
    if (response.status === 201) {
      dispatch(editWorkerForm());
    }
    // dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en put, no entra");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Error en el registro");
  }
};

export const putDayWorker = (body) => async (dispatch) => {
  try {
    // const cookies = new Cookies();
    const response = await axios.put("/api/daysWorkers/register", body);

    // const { token, message, ...user } = response;
    // cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // toast.success("Usuario registrado con exito");
    if (response.status === 201) {
      dispatch(editWorkerDay());
    }
    // dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en put, no entra");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Error en el registro");
  }
};

export const deleteDayWorker = (body) => async (dispatch) => {
  try {
    // const cookies = new Cookies();
    console.log("esto es el body de action", body);
    const response = await axios.delete("/api/daysWorkers/register", {
      data: body,
    });

    // const { token, message, ...user } = response;
    // cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // toast.success("Usuario registrado con exito");
    if (response.status === 201) {
      dispatch(editWorkerDay());
    }
    // dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en delete, no entra");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Error en el registro");
  }
};
