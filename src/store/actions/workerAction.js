import axios from "axios";
import { workerRegisterForm } from "./modalAction";

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
