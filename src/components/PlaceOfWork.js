/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";
import { workPlaceWorker } from "@/store/actions/workerAction";

export default function PlaceOfWork() {
  const [formData, setFormData] = useState({
    placeName: "",
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

    dispatch(workPlaceWorker(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}> Lugar de Trabajo </p>
      </header>

      <div className={styles.register__content}>
        <label>
          Lugar de Trabajo:
          <InputValidator
            name="placeName"
            value={formData.name}
            type="text"
            classname={styles.register__input}
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
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
          Registrar Lugar
        </button>
      </div>
    </form>
  );
}
