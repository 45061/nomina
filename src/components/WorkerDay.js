/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
import { showLoginNav, hiddeRegisterForm } from "../store/actions/modalAction";
import { Button, Popover } from "@mantine/core";
// import ButtonAction from "../ButtonAction";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { registerDayWorker } from "@/store/actions/workerAction";
import DatePicker from "react-datepicker";

export default function WorkerForm({ idWorker }) {
  const [dateEntryTime, setDateEntryTime] = useState();
  const [datedepartureTime, setDatedepartureTime] = useState();
  const dataDate = dayjs(dateEntryTime);

  const [formData, setFormData] = useState({
    workerId: "",
    workDay: "",
    entryTime: "",
    departureTime: "",
    hoursWorked: "",
    lunch: "",
    extraHours: "",
    mustHours: "",
    nightHours: "",
    holiday: "",
    vacations: "",
    inability: "",
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
    formData.workerId = idWorker;
    formData.workDay = formData.entryTime;
    // formData.entryTime = dateEntryTime;
    // formData.departureTime = datedepartureTime;

    dispatch(registerDayWorker(formData));
    console.log(formData);

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
        <p className={styles.register__title}> Día del Empleado </p>
      </header>

      <div className={styles.register__content}>
        {/* <DatePicker
          wrapperClassName="datePicker"
          showTimeSelect
          timeIntervals={1}
          placeholderText="Hora de ingreso"
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={dateEntryTime}
          onChange={(date) => setDateEntryTime(date)}
          className={styles.datePiker}
        />
        <DatePicker
          wrapperClassName="datePicker"
          showTimeSelect
          timeIntervals={1}
          placeholderText="Hora de Salida"
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={datedepartureTime}
          onChange={(date) => setDatedepartureTime(date)}
          className={styles.datePiker}
        /> */}
        <label>
          Hora de Entrada:
          <InputValidator
            name="entryTime"
            value={formData.name}
            type="datetime-local"
            classname={styles.register__input}
            placeholder="Horas Extras"
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
            required
          />
        </label>
        <label>
          Hora de Salida:
          <InputValidator
            name="departureTime"
            value={formData.name}
            type="datetime-local"
            classname={styles.register__input}
            placeholder="Horas Extras"
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
            required
          />
        </label>
        {/* <InputValidator
          name="extraHours"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Horas Extras"
          onChange={onChange}
          errorMessage="Nombre no debe estar vacio"
          required
        />
        <InputValidator
          name="mustHours"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Horas que Deberia"
          onChange={onChange}
          errorMessage="Apellido no debe estar vacio"
          required
        />
        <div className="register__input--span">
          <InputValidator
            name="nightHours"
            value={formData.name}
            type="email"
            classname={styles.register__input}
            placeholder="Horas Nocturnas"
            onChange={onChange}
            errorMessage="Debe ser email valido"
            required
          />
        </div>
        <InputValidator
          name="holiday"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Horas Festivas"
          onChange={onChange}
          errorMessage="Numero no debe estar vacio"
          required
        /> */}
        <InputValidator
          name="vacations"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Vacaciones"
          onChange={onChange}
          errorMessage="No debe estar vacio"
          required
        />
        <InputValidator
          name="inability"
          value={formData.name}
          type="text"
          classname={styles.register__input}
          placeholder="Incapacitado"
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
          Registrar Día
        </button>
      </div>
    </form>
  );
}
