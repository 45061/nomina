import axios from "axios";
import { toast } from "react-toastify";
import {
  editWorkerDay,
  editWorkerForm,
  workerDayForm,
  workerRegisterForm,
} from "./modalAction";

import { DAYS_OF_WORKER, DATA_WORKER } from "../types";

export const registerWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/workers/register", body);

    if (response.status === 201) {
      toast.success("Trabajador registrado con exito");
      dispatch(workerRegisterForm());
    }
  } catch (error) {
    console.log("hay un error en register, no entra");
    toast.error("Error en el registro");
  }
};

export const registerDayWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/daysWorkers/register", body);

    if (response.status === 201) {
      dispatch(workerDayForm());
      toast.success("Día registrado con exito");
    }
  } catch (error) {
    console.log("hay un error en register, no entra");
    toast.error("Error en el registro");
  }
};

export const putWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.put("/api/workers/register", body);

    //
    if (response.status === 201) {
      dispatch(editWorkerForm());
      toast.success("Trabajador actualizado con exito");
    }
  } catch (error) {
    console.log("hay un error en put, no entra");
    toast.error("Error en la actualización");
  }
};

export const putDayWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.put("/api/daysWorkers/register", body);

    if (response.status === 201) {
      dispatch(editWorkerDay());
      toast.success("Día actualizado con exito");
    }
  } catch (error) {
    console.log("hay un error en put, no entra");
    toast.error("Error en la actualización");
  }
};

export const deleteDayWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.delete("/api/daysWorkers/register", {
      data: body,
    });

    if (response.status === 201) {
      dispatch(editWorkerDay());
      toast.success("Día eliminado con exito");
    }
  } catch (error) {
    console.log("hay un error en delete, no entra");
    toast.error("Error en la eliminación");
  }
};

export const filterDayWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/daysWorkers/", body);

    const { status, data } = response;

    if (status === 201) {
      toast.success("Filtrado con exito");
      dispatch({ type: DATA_WORKER, payload: data.newWorker });
      dispatch({ type: DAYS_OF_WORKER, payload: data.listDaysWork });
    }
  } catch (error) {
    console.log("hay un error en filter, no entra");
    toast.error("Error en el filtrado");
  }
};
