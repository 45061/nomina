/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { registerDayWorker } from "@/store/actions/workerAction";

export default function WorkerForm({ idWorker, data }) {
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
    lunchTime: "",
    holiday: "",
    vacations: "",
    inability: "",
    placeOfWork: "",
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
    dispatch(registerDayWorker(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}> Día del Empleado </p>
      </header>

      <div className={styles.register__content}>
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
        <div className="register__input--span">
          <InputValidator
            name="lunchTime"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder="Minutos de Almuerzo"
            onChange={onChange}
            errorMessage="Debe ser una hora"
            required
          />
        </div>
        <select
          name="holiday"
          value={formData.name}
          className={styles.register__input}
          onChange={onChange}
        >
          <option value="">¿El día es festivo?</option>
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>
        <select
          name="placeOfWork"
          value={formData.name}
          className={styles.register__input}
          onChange={onChange}
        >
          <option value="">¿Lugar de Trabajo?</option>
          {data.map((option) => (
            <option value={option._id} key={option._id}>
              {option.placeName}
            </option>
          ))}
        </select>
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
