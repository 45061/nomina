/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
import { showLoginNav, hiddeRegisterForm } from "../store/actions/modalAction";
import { Button, Popover } from "@mantine/core";
// import ButtonAction from "../ButtonAction";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { putWorker, registerWorker } from "@/store/actions/workerAction";

export default function EditWorkerForm({ data }) {
  const [value, setValue] = useState(false);
  const [opened, setOpened] = useState(false);
  const dataDate = dayjs(value);

  const [formData, setFormData] = useState({
    id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    numer: data.numer,
    dateOfAdmission: data.dateOfAdmission,
    salary: data.salary,
    positionInTheCompany: data.positionInTheCompany,
    healthProvider: data.healthProvider,
    pensionProvider: data.pensionProvider,
    compensationBox: data.compensationBox,
    occupationalRiskInsurer: data.occupationalRiskInsurer,
    activeEmployee: data.activeEmployee,
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(putWorker(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          {/* <div className={styles.register__brand}> */}
          <img src="/nominaApp.svg" alt="logoNomina" />
          {/* </div> */}
        </div>
        <p className={styles.register__title}> Cambio de Datos de Empleado</p>
      </header>
      <div className={styles.register__content}>
        <InputValidator
          name="firstName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.firstName}
          onChange={onChange}
          errorMessage="Nombre no debe estar vacio"
          required
        />
        <InputValidator
          name="lastName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.lastName}
          onChange={onChange}
          errorMessage="Apellido no debe estar vacio"
          required
        />
        <div className="register__input--span">
          <InputValidator
            name="email"
            value={formData.name}
            type="email"
            classname={styles.register__input}
            placeholder={data.email}
            onChange={onChange}
            errorMessage="Debe ser email valido"
            required
          />
        </div>
        <InputValidator
          name="numer"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.numer}
          onChange={onChange}
          errorMessage="Numero no debe estar vacio"
          required
        />
        <InputValidator
          name="salary"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.salary}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="positionInTheCompany"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.positionInTheCompany}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="healthProvider"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.healthProvider}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="pensionProvider"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.pensionProvider}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="compensationBox"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.compensationBox}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="occupationalRiskInsurer"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder={data.occupationalRiskInsurer}
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <select
          name="activeEmployee"
          value={formData.name}
          className={styles.register__input}
          onChange={onChange}
        >
          <option value={true}>¿El empleado sigue activo?</option>
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div className={styles.register__worker}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Cambio Información
        </button>
      </div>
    </form>
  );
}
