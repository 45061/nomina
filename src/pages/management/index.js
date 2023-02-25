/* eslint-disable react-hooks/rules-of-hooks */

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import styles from "../../styles/pages/management.module.scss";
import { Tabs, Table, Select } from "@mantine/core";
import InputValidator from "@/components/ImputValidator";

export default function management() {
  const { user } = useSelector((state) => state.authReducer);

  const [dataWorkers, setDataWorkes] = useState([]);
  const [value, setValue] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    // dispatch(workerDayForm());
  };

  const [formData, setFormData] = useState({
    firstDate: "",
    secondDate: "",
  });

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        console.log("entra al fetch");
        const response = await axios.get("/api/workers/register");
        setDataWorkes(response.data.workers);
      } catch (error) {
        console.log("hay un error en fetchWorker, no entra");
      }
    };
    fetchWorker();
  }, []);
  console.log("dia", dayjs(formData.firstDate));

  return (
    <div className={styles.container}>
      <div className={styles.container__data}>
        <div className={styles.data__dataUser}>
          <h1>Bienvenido a la gestión de trabajadores</h1>
          <h2>
            Hola {user?.name} {user?.lastName}
          </h2>
          <h4>
            {user?.typeUser
              ? "Tipo de usuario: Administrador"
              : "Tipo de usuario: Huesped"}
          </h4>
        </div>
      </div>
      <div className={styles.dataWorkers}>
        <h4>Acá podras listar las quincenas de los trabajadores</h4>
      </div>
      <div className={styles.dataWorkers__info}>
        <Select
          label="Seleccionar Empleado"
          placeholder="Empleado"
          value={value}
          onChange={setValue}
          data={dataWorkers.map((item) => ({
            value: item._id,
            label: `${item.firstName} ${item.lastName}`,
          }))}
        />
        <label>
          Primer Día:{" "}
          <InputValidator
            name="firstDate"
            value={formData.name}
            type="date"
            classname={styles.register__input}
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
            required
          />
        </label>
        <label>
          Segundo Día:{" "}
          <InputValidator
            name="secondDate"
            value={formData.name}
            type="date"
            classname={styles.register__input}
            onChange={onChange}
            errorMessage="Nombre no debe estar vacio"
            required
          />
        </label>
        <div className={styles.data__buttonNewWorker}>
          <button onClick={handleClick}>Crear Día Trabajado</button>
        </div>
      </div>
    </div>
  );
}
