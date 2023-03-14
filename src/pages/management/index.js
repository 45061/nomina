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
  const [dataRoute, setDataRoute] = useState([]);

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
        const response = await axios.get("/api/workers/register");
        setDataWorkes(response.data.workers);
      } catch (error) {
        console.log("hay un error en fetchWorker, no entra");
      }
    };
    fetchWorker();

    const fetchRoutes = async () => {
      const response = await axios.get("/api/routesCost");
      setDataRoute(response.data.routes);
    };

    fetchRoutes();
  }, [worker, daysWorker]);

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
    ?.map((element) => {
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

          {element.placeOfWork[0] && (
            <td>{element.placeOfWork[0].placeName}</td>
          )}
        </tr>
      );
    })
    .reverse();

  const arrayHours =
    daysWorker
      ?.filter((day) => day.holiday === false)
      .map((day) => day.hoursWorked.split(":").map((numer) => parseInt(numer)))
      .map((day) => day[0] * 60 + day[1])
      .reduce((total, value) => total + value, 0) / 60;

  const totalHours = Math.floor(arrayHours);
  const totalMinuts = Math.round((arrayHours - totalHours) * 60);

  const arrayHoursExtra =
    daysWorker
      ?.map((day) => day.extraHours.split(":").map((numer) => parseInt(numer)))
      .map((day) => day[0] * 60 + day[1])
      .reduce((total, value) => total + value, 0) / 60;

  const totalHoursExtra = Math.floor(arrayHoursExtra);
  const totalMinutsExtra = Math.round((arrayHoursExtra - totalHoursExtra) * 60);

  const arrayHoursMust =
    daysWorker
      ?.map((day) => day.mustHours.split(":").map((numer) => parseInt(numer)))
      .map((day) => day[0] * 60 + day[1])
      .reduce((total, value) => total + value, 0) / 60;

  const totalHoursMust = Math.floor(arrayHoursMust);
  const totalMinutsMust = Math.round((arrayHoursMust - totalHoursMust) * 60);

  const arrayHoursNight = daysWorker
    ?.map((day) => parseInt(day.nightHours))
    .reduce((total, value) => total + value, 0);

  const arrayHoursHoliday =
    daysWorker
      ?.filter((day) => day.holiday === true)
      .map((day) => day.hoursWorked.split(":").map((numer) => parseInt(numer)))
      .map((day) => day[0] * 60 + day[1])
      .reduce((total, value) => total + value, 0) / 60;

  const totalHoursHoliday = Math.floor(arrayHoursHoliday);
  const totalMinutsHoliday = Math.round(
    (arrayHoursHoliday - totalHoursHoliday) * 60
  );

  const payHour = new Intl.NumberFormat("es-MX").format(
    ((totalHours -
      totalHoursExtra -
      arrayHoursNight +
      (totalMinuts - totalMinutsExtra) / 60) *
      parseInt(worker.salary)) /
      240
  );
  const payHourExtra = new Intl.NumberFormat("es-MX").format(
    (((totalHoursExtra -
      totalHoursMust +
      (totalMinutsExtra - totalMinutsMust) / 60) *
      parseInt(worker.salary)) /
      240) *
      1.25
  );
  const payHourNight = new Intl.NumberFormat("es-MX").format(
    ((arrayHoursNight * parseInt(worker.salary)) / 240) * 1.75
  );
  const payHourHoliday = new Intl.NumberFormat("es-MX").format(
    (((arrayHoursHoliday + totalMinutsHoliday / 60) * parseInt(worker.salary)) /
      240) *
      1.75
  );

  const arrayCostRoutes = [];
  if (worker !== false) {
    dataRoute
      .filter((route) => route.firstPlace[0]._id === worker.recidence[0]._id)
      .map((place) => {
        daysWorker.map((day) => {
          if (day.placeOfWork[0]._id === place.secondPlace[0]._id) {
            arrayCostRoutes.push(place.subsidy);
          }
        });
      });
  }

  const totalCostRoutes = arrayCostRoutes.reduce(
    (total, value) => total + value,
    0
  );

  const total = new Intl.NumberFormat("es-MX").format(
    Math.round(
      (((arrayHoursHoliday + totalMinutsHoliday / 60) *
        parseInt(worker.salary)) /
        240) *
        1.75 +
        ((arrayHoursNight * parseInt(worker.salary)) / 240) * 1.75 +
        (((totalHoursExtra -
          totalHoursMust +
          (totalMinutsExtra - totalMinutsMust) / 60) *
          parseInt(worker.salary)) /
          240) *
          1.25 +
        ((totalHours -
          totalHoursExtra -
          arrayHoursNight +
          (totalMinuts - totalMinutsExtra) / 60) *
          parseInt(worker.salary)) /
          240 +
        parseInt(totalCostRoutes)
    )
  );

  const handleClick = (event) => {
    event.preventDefault();
    formData.workerId = value;
    dispatch(filterDayWorker(formData));
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

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
                        <th>Trabajo en:</th>
                      </tr>
                    </thead>
                    <tbody>{row}</tbody>
                  </Table>
                )}
              </div>
              <div className={styles.tables}>
                <div className={styles.tableOfWorkers}>
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Horas Trabajadas No Festivas</th>
                        <th>Horas Extras</th>
                        <th>Horas Faltantes</th>
                        <th>Horas Nocturnas</th>
                        <th>Horas Festivas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{`${totalHours}:${totalMinuts}`}</td>
                        <td>{`${totalHoursExtra}:${totalMinutsExtra}`}</td>
                        <td>{`${totalHoursMust}:${totalMinutsMust}`}</td>
                        <td>{arrayHoursNight}</td>
                        <td>{`${totalHoursHoliday}:${totalMinutsHoliday}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className={styles.tableOfWorkers}>
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Horas a Cancelar</th>
                        <th>Horas Extras Totales</th>
                        <th>Horas Nocturnas</th>
                        <th>Horas Festivas</th>
                        <th>Total Transporte</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{`${
                          totalHours - totalHoursExtra - arrayHoursNight
                        }:${totalMinuts - totalMinutsExtra}`}</td>
                        <td>{`${totalHoursExtra - totalHoursMust}:${
                          totalMinutsExtra - totalMinutsMust
                        }`}</td>
                        <td>{arrayHoursNight}</td>
                        <td>{`${totalHoursHoliday}:${totalMinutsHoliday}`}</td>
                      </tr>
                      <tr>
                        <td>$ {payHour}</td>
                        <td>$ {payHourExtra}</td>
                        <td>$ {payHourNight}</td>
                        <td>$ {payHourHoliday}</td>
                        <td>$ {totalCostRoutes}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <h2> Total Quincena: $ {total}</h2>
                <div className={styles.data__buttonReport}>
                  <button onClick={handleClick2}>Generar Informe</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
