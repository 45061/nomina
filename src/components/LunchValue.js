/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";
import { postReport } from "@/store/actions/workerAction";

export default function LunchValue({
  numberLunches,
  fullPayment,
  transport,
  holidayHoursMoney,
  holidayHours,
  nightHoursMoney,
  nightHours,
  extraHoursMoney,
  extraHours,
  hoursToPayMoney,
  hoursToPay,
  data,
}) {
  const [formData, setFormData] = useState({
    valueLunches: "",
    numberLunches,
    fullPayment,
    transport,
    holidayHoursMoney,
    holidayHours,
    nightHoursMoney,
    nightHours,
    extraHoursMoney,
    extraHours,
    hoursToPayMoney,
    hoursToPay,
    workerId: data.workerId,
    firstDate: data.firstDate,
    secondDate: data.secondDate,
  });

  const dispatch = useDispatch();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postReport(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}> Generador de informes </p>
      </header>

      <div className={styles.register__content}>
        <label>
          Valor del Almuerzo:
          <InputValidator
            name="valueLunches"
            value={formData.name}
            type="number"
            classname={styles.register__input}
            onChange={onChange}
            errorMessage="Valor no valido "
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
          Generar Informe
        </button>
      </div>
    </form>
  );
}
