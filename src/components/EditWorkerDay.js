/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { deleteDayWorker, putDayWorker } from "@/store/actions/workerAction";

export default function EditWorkerForm({ data }) {
  const [formData, setFormData] = useState({
    id: data._id,
    workerId: data.workerId,
    workDay: data.workDay,
    entryTime: data.entryTime,
    departureTime: data.departureTime,
    hoursWorked: data.hoursWorked,
    lunch: data.lunch,
    extraHours: data.extraHours,
    mustHours: data.mustHours,
    nightHours: data.nightHours,
    lunchTime: data.lunchTime,
    holiday: data.holiday,
    vacations: data.vacations,
    inability: data.inability,
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

    formData.workDay = formData.entryTime;
    dispatch(putDayWorker(formData));
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    dispatch(deleteDayWorker(data));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}>Edición Día del Empleado </p>
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
          <label>
            {" "}
            Horas Nocturnas
            <InputValidator
              name="nightHours"
              value={formData.name}
              type="email"
              classname={styles.register__input}
              placeholder={data.nightHours}
              onChange={onChange}
              errorMessage="Debe ser email valido"
              required
            />
          </label>
          <label>
            {" "}
            Minutos de Almuerzo
            <InputValidator
              name="lunchTime"
              value={formData.name}
              type="email"
              classname={styles.register__input}
              placeholder={data.lunchTime}
              onChange={onChange}
              errorMessage="Debe ser email valido"
              required
            />
          </label>
        </div>
        <label>
          {" "}
          Día Festivo
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
        </label>
        <label>
          {" "}
          Esta en Vacaciones
          <InputValidator
            name="vacations"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder={data.vacations}
            onChange={onChange}
            errorMessage="No debe estar vacio"
            required
          />
        </label>
        <label>
          {" "}
          Esta Incapacitado
          <InputValidator
            name="inability"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            placeholder={data.inability}
            onChange={onChange}
            errorMessage="No debe estar vacio"
            required
          />
        </label>
      </div>
      <div className={styles.register__worker}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Actualizar el Día
        </button>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit2}
        >
          Eliminar Día
        </button>
      </div>
    </form>
  );
}
