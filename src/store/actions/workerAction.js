import axios from "axios";
import { toast } from "react-toastify";
import {
  editRouteCost,
  editWorkerDay,
  editWorkerForm,
  placeRecidence,
  placeWorkerDay,
  reportForm,
  routeCost,
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

export const residencePlaceWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/places/recidencePlace", body);

    const { status } = response;

    if (status === 201) {
      dispatch(placeRecidence());
      toast.success("Lugar creado con exito");
    }
  } catch (error) {
    console.log("hay un error en ResidencePlaceWorker, no entra");
    toast.error("Error en el en la creación");
  }
};

export const workPlaceWorker = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/places/workPlace", body);

    const { status } = response;

    if (status === 201) {
      dispatch(placeWorkerDay());
      toast.success("Lugar creado con exito");
    }
  } catch (error) {
    console.log("hay un error en  workPlaceWorker, no entra");
    toast.error("Error en el en la creación");
  }
};

export const routeSubsidy = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/routesCost", body);

    const { status } = response;

    if (status === 201) {
      dispatch(routeCost());
      toast.success("Ruta creada con exito");
    }
  } catch (error) {
    console.log("hay un error en  routeSubsidy, no entra");
    toast.error("Error en el en la creación");
  }
};

export const editRouteSubsidy = (body) => async (dispatch) => {
  try {
    const response = await axios.put("/api/routesCost", body);

    const { status } = response;

    if (status === 201) {
      dispatch(editRouteCost());
      toast.success("Ruta editada con exito");
    }
  } catch (error) {
    console.log("hay un error en  editRouteSubsidy, no entra");
    toast.error("Error en el en la creación");
  }
};

export const postReport = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/report", body);

    const { status } = response;

    if (status === 201) {
      dispatch(reportForm());
      toast.success("Reporte creado con exito");
    }
  } catch (error) {
    console.log("hay un error en  postReport, no entra");
    toast.error("Error en el en la creación");
  }
};
