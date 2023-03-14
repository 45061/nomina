/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { routeSubsidy } from "@/store/actions/workerAction";

export default function RouteCost({ workPlace, recidence }) {
  const [formData, setFormData] = useState({
    firstPlace: "",
    secondPlace: "",
    subsidy: "",
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
    dispatch(routeSubsidy(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}> Crear Recoriido </p>
      </header>

      <div className={styles.register__content}>
        <label>
          Lugar de Recidencia:
          <select
            name="firstPlace"
            value={formData.name}
            className={styles.register__input}
            onChange={onChange}
          >
            <option value="">¿Lugar de Recidencia?</option>
            {recidence.map((option) => (
              <option value={option._id} key={option._id}>
                {option.placeName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Lugar de Trabajo:
          <select
            name="secondPlace"
            value={formData.name}
            className={styles.register__input}
            onChange={onChange}
          >
            <option value="">¿Lugar de Trabajo?</option>
            {workPlace.map((option) => (
              <option value={option._id} key={option._id}>
                {option.placeName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Valor subcidio:
          <InputValidator
            name="subsidy"
            value={formData.name}
            type="number"
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
          Registrar Recorrido
        </button>
      </div>
    </form>
  );
}
