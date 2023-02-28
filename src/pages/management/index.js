/* eslint-disable react-hooks/rules-of-hooks */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import styles from "../../styles/pages/management.module.scss";
import { Table, Select, Divider } from "@mantine/core";
import InputValidator from "@/components/ImputValidator";
import { filterDayWorker } from "@/store/actions/workerAction";

export default function management() {
  const { user } = useSelector((state) => state.authReducer);
  const { worker, daysWorker } = useSelector((state) => state.workerReducer);
  const dispatch = useDispatch();

  const [dataWorkers, setDataWorkes] = useState([]);
  const [value, setValue] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    formData.workerId = value;
    console.log("estyos son los dias", formData);
    dispatch(filterDayWorker(formData));
  };

  const [formData, setFormData] = useState({
    workerId: "",
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
  }, [worker, daysWorker]);

  console.log("este es el trabajador", worker);
  console.log("estos son los dias trabajados", daysWorker);

  const week = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mie",
    4: "Jue",
    5: "Vie",
    6: "Sab",
  };

  const row = daysWorker
    .map((element) => {
      const workDay = `${dayjs(element.workDay).$d.toString().substr(3, 13)}
      ${week[dayjs(element.workDay).$W]}`;

      return (
        <tr key={element._id}>
          <td>{workDay}</td>

          <td>{element.hoursWorked}</td>

          <td>{element.lunch ? <p>Si</p> : <p>No</p>}</td>

          <td>{element.extraHours}</td>

          <td>{element.mustHours} </td>

          <td>{element.nightHours}</td>

          <td>{element.holiday ? <p>Si</p> : <p>No</p>}</td>
        </tr>
      );
    })
    .reverse();

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
          <button onClick={handleClick}>Filtrar Días</button>
        </div>
      </div>
      <Divider />
      <div>
        {!worker ? (
          <div className={styles.data__workerW8}>
            <h2>Seleccionar trabajador</h2>
            <h2>Seleccionar Fechas Deseadas</h2>
          </div>
        ) : (
          <>
            <div className={styles.data__worker}>
              <div className={styles.worker__info}>
                <h4>Empleado: {worker.name}</h4>
                <h4>Empleado: {worker.numer}</h4>
                <h4>Empleado: {worker.email}</h4>
              </div>
              <div className={styles.worker__info}>
                <h4>Empleado: {worker.positionInTheCompany}</h4>
                <h4>
                  Salario: $
                  {new Intl.NumberFormat("es-MX").format(worker.salary)}
                </h4>
                <h4>
                  Fecha Ingreso:{" "}
                  {dayjs(worker.dateOfAdmission).$d.toString().substr(3, 12)}
                </h4>
              </div>
            </div>
            <Divider />
            <div className={styles.data__workerDays}>
              <div className={styles.tableOfWorkers}>
                {daysWorker && (
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Día Trabajado</th>
                        <th>Horas Trabajadas</th>
                        <th>Almuerzo Completo</th>
                        <th>Horas Extras</th>
                        <th>Horas que Debe</th>
                        <th>Horas Nocturnas</th>
                        <th>Día Festivo</th>
                      </tr>
                    </thead>
                    <tbody>{row}</tbody>
                  </Table>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
