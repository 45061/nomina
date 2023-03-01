/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Router from "next/router";
import axios from "axios";

import { toast } from "react-toastify";
import { hiddeLoginNav, hiddeRegisterForm } from "./modalAction";
import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT, USER_SUCCESS } from "../types";

export const register = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/user/signup", body);

    const { token, message, ...user } = response;

    toast.success("Usuario registrado con exito");
    dispatch(hiddeRegisterForm());
    dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    console.log("hay un error en register, no entra");
    dispatch({ type: AUTH_ERROR, payload: error });
    toast.error("Error en el registro");
  }
};

export const logout = () => async (dispatch) => {
  Router.push("/");
  const response = await axios.post("/api/user/logout");
  toast.success("Logout con exito");
  dispatch({ type: LOGOUT });
};

export const login = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/user/login", body);

    if (response.status === 201) {
      Router.push("userProfile");
    }

    if (response.status === 403) {
      return toast.error(response.data.message);
    }

    dispatch(hiddeLoginNav());
    toast.success("Usuario ha realizado login con exito");
    dispatch({ type: AUTH_SUCCESS, payload: response.user });
  } catch (error) {
    console.log("hay un errror en login");
    dispatch({ type: AUTH_ERROR, payload: error });
    toast.error("Usuario o contraseña errada");
  }
};

export const getUserData = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/user/profile");
    if (response.status === 100) {
    }
    dispatch({ type: USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    console.log("error en la solicitud de datos del usuario GetUerData");
    dispatch({ type: AUTH_ERROR, payload: error.response });
  }
};
