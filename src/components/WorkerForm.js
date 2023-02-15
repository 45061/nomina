/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { showLoginNav, hiddeRegisterForm } from "../store/actions/modalAction";
// import ButtonAction from "../ButtonAction";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { register } from "../store/actions/authAction";

export default function WorkerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numer: "",
    dateOfAdmission: "",
    salary: "",
    positionInTheCompany: "",
    healthProvider: "",
    pensionProvider: "",
    compensationBox: "",
    occupationalRiskInsurer: "",
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

    // dispatch(register(formData));

    dispatch(hiddeRegisterForm());
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          {/* <div className={styles.register__brand}> */}
          <img src="/nominaApp.svg" alt="logoNomina" />
          {/* </div> */}
        </div>
        <p className={styles.register__title}> Registro de Empleado</p>
      </header>
      <div className={styles.register__content}>
        <InputValidator
          name="firstName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Nombres"
          onChange={onChange}
          errorMessage="Nombre no debe estar vacio"
          required
        />
        <InputValidator
          name="lastName"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Apellidos"
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
            placeholder="Email"
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
          placeholder="Numero"
          onChange={onChange}
          errorMessage="Numero no debe estar vacio"
          required
        />
        <InputValidator
          name="dateOfAdmission"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Fecha de Ingreso"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="salary"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Salario"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="positionInTheCompany"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Cargo"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="healthProvider"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="EPS"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="pensionProvider"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Fondo de Pensiones"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="compensationBox"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Caja de Compensación"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="occupationalRiskInsurer"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="ARL"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
      </div>
      <div className={styles.register__worker}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Registrar Trabajador
        </button>
      </div>
    </form>
  );
}
