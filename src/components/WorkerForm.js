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

import { registerWorker } from "@/store/actions/workerAction";

export default function WorkerForm() {
  const [value, setValue] = useState(false);
  const [opened, setOpened] = useState(false);
  const dataDate = dayjs(value);

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

  const month = {
    0: "Ene",
    1: "Feb",
    2: "Mar",
    3: "Abr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Ago",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dic",
  };

  const week = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mie",
    4: "Jue",
    5: "Vie",
    6: "Sab",
  };

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
    formData.dateOfAdmission = value;
    dispatch(registerWorker(formData));

    // dispatch(hiddeRegisterForm());
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

        <Popover
          style={{ marginTop: 5, borderRadius: 30 }}
          sx={(theme) => ({
            backgroundColor: "purple",
            "&:hover": {
              backgroundColor: theme.colors.violet[6],
            },
          })}
          opened={opened}
          onClose={() => setOpened(false)}
          width={310}
          position="top"
          withArrow
        >
          <Popover.Target>
            <Button variant="violet" onClick={() => setOpened(true)}>
              Fecha de Ingreso
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar value={value} onChange={setValue} locale="es-mx" />
          </Popover.Dropdown>
        </Popover>
        <div className={styles.date__worker}>
          {!value ? (
            <h1>Seleccionar Fecha</h1>
          ) : (
            <h1>
              {month[dataDate.$M]} {dataDate.$D} {dataDate.$y}
            </h1>
          )}
        </div>
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
