/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputValidator from "./ImputValidator";

import styles from "../styles/components/Register.module.scss";

import { editRouteSubsidy } from "@/store/actions/workerAction";

export default function EditRouteCost({ workPlace, recidence, route }) {
  const [formData, setFormData] = useState({
    firstPlace: route.firstPlace[0]._id,
    secondPlace: route.secondPlace[0]._id,
    subsidy: route.subsidy,
    id: route._id,
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
    dispatch(editRouteSubsidy(formData));
  };

  return (
    <form className={styles.register}>
      <header className={styles.register__header}>
        <div className={styles.register__brand}>
          <img src="/nominaApp.svg" alt="logoNomina" />
        </div>
        <p className={styles.register__title}> Editar Recorrido </p>
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
            <option value={route.firstPlace[0]._id}>
              {route.firstPlace[0].placeName}
            </option>
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
            <option value={route.secondPlace[0]._id}>
              {route.secondPlace[0].placeName}
            </option>
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
            placeholder={route.subsidy}
          />
        </label>
      </div>
      <div className={styles.register__worker}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Editar Recorrido
        </button>
      </div>
    </form>
  );
}
