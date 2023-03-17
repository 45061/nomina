/* eslint-disable react-hooks/rules-of-hooks */

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";

import styles from "../../styles/pages/management.module.scss";
import { Table, Select, Divider } from "@mantine/core";
import PublicModal from "@/components/PublicModal";
import { reportForm } from "@/store/actions/modalAction";
import { getReports } from "../api/getPosts";

export default function report({ dataWorkers }) {
  const { user } = useSelector((state) => state.authReducer);
  const workers = JSON.parse(dataWorkers);
  // const { worker, daysWorker } = useSelector((state) => state.workerReducer);
  // const { showingReportForm } = useSelector((state) => state.modalReducer);
  // const dispatch = useDispatch();

  const largeScreen = useMediaQuery("(min-width: 1024px)");

  const [value, setValue] = useState(null);
  const [view, setview] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    const worker = workers.filter((workerId) => workerId._id === value);

    const row = worker[0].reports
      .map((element) => {
        const workDay = `${dayjs(element.createdAt)
          .$d.toString()
          .substr(3, 13)}`;
        const lunches =
          parseInt(element.numberLunches) * parseInt(element.valueLunches);
        console.log("esto es element", element);
        return (
          <tr key={element._id}>
            <td>{workDay}</td>
            <td>{`${dayjs(element.firstDate).$d.toString().substr(3, 13)}`}</td>
            <td>{`${dayjs(element.secondDate)
              .$d.toString()
              .substr(3, 13)}`}</td>
            <td>{element.hoursToPay}</td>
            <td>${element.hoursToPayMoney}</td>
            <td>{element.extraHours}</td>
            <td>${element.extraHoursMoney} </td>
            <td>{element.nightHours}</td>
            <td>${element.nightHoursMoney}</td>
            <td>{element.holidayHours}</td>
            <td>${element.holidayHoursMoney}</td>
            <td>${new Intl.NumberFormat("es-MX").format(element.transport)}</td>
            <td>${new Intl.NumberFormat("es-MX").format(lunches)}</td>
            <td>
              $
              {new Intl.NumberFormat("es-MX").format(
                parseInt(element.fullPayment) - parseInt(lunches)
              )}
            </td>
          </tr>
        );
      })
      .reverse();
    setview(row);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__data}>
        <div className={styles.data__dataUser}>
          <h1>Bienvenido a la vista de informes</h1>
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
          data={workers.map((item) => ({
            value: item._id,
            label: `${item.firstName} ${item.lastName}`,
          }))}
        />
        <div className={styles.data__buttonNewWorker}>
          <button onClick={handleClick}>Listar Informes</button>
        </div>
      </div>
      <Divider />
      <div>
        {!view ? (
          <div className={styles.data__workerW8}>
            <h2>Seleccionar trabajador</h2>
            <h2>Para visualizar los informes</h2>
          </div>
        ) : (
          <>
            <Divider />
            <div className={styles.tableOfWorkers}>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Fecha Informe</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Cierre</th>
                    <th>Horas a Pagar</th>
                    <th>Valor Horas</th>
                    <th>Horas Extras</th>
                    <th>Valor Horas Extras</th>
                    <th>Horas Nocturnas</th>
                    <th>Valor Horas Nocturnas</th>
                    <th>Horas Festivas</th>
                    <th>Valor Horas Festivas</th>
                    <th>Valor Transporte</th>
                    <th>Valor Almuerzos</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>{view}</tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiworkers = await getReports();
  const dataWorkers = JSON.stringify(apiworkers);

  return { props: { dataWorkers } };
}
