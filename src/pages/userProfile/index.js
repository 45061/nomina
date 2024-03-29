/* eslint-disable react-hooks/rules-of-hooks */
// import profileHandler from "../api/user/profile";
// import fetchProfile from "../../pages/api/getData";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "../../styles/pages/userProfile.module.scss";
import { Tabs, Table, Select, Divider } from "@mantine/core";
import { BrandBooking } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import PublicModal from "@/components/PublicModal";
import {
  workerDayForm,
  workerRegisterForm,
  editWorkerForm,
  editWorkerDay,
  placeWorkerDay,
  placeRecidence,
  routeCost,
  editRouteCost,
} from "@/store/actions/modalAction";
import WorkerForm from "@/components/WorkerForm";
import { useMediaQuery } from "@mantine/hooks";
import WorkerDay from "@/components/WorkerDay";
import EditWorkerForm from "@/components/EditWorkerForm";
import EditWorkerDay from "@/components/EditWorkerDay";
import PlaceOfWork from "@/components/PlaceOfWork";
import RecidenceWorker from "@/components/RecidenceWorker";
import RouteCost from "@/components/RouteCost";
import EditRouteCost from "@/components/EditRouteCost";

export default function userProfile() {
  const { user } = useSelector((state) => state.authReducer);
  const {
    showingWorkerRegisterForm,
    showingWorkerDayForm,
    showingEditWorker,
    showingEditWorkerDay,
    showingPlaceWorkerDay,
    showingPlaceRecidence,
    showingRouteCost,
    showingEditRouteCost,
  } = useSelector((state) => state.modalReducer);

  const dispatch = useDispatch();

  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const [dataWorkers, setDataWorkes] = useState([]);
  const [dataDaysWorkes, setDataDaysWorkes] = useState([]);
  const [value, setValue] = useState(null);
  const [dataWorker, setDataWorker] = useState({});
  const [dataWorkerDay, setDataWorkerDay] = useState({});
  const [dataRecidence, setDataRecidence] = useState([]);
  const [dataWorkPlace, setDataWorkPlace] = useState([]);
  const [dataRoutes, setDataRoutes] = useState([]);
  const [dataRoute, setDataRoute] = useState([]);

  const week = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mie",
    4: "Jue",
    5: "Vie",
    6: "Sab",
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

    const dataDaysWorker = async () => {
      try {
        const workId = { id: value };
        if (!value) {
          return;
        }
        const response = await axios.post(
          "/api/daysWorkers/daysWorker",
          workId
        );

        setDataDaysWorkes(response.data.worker.workedDays);
      } catch (error) {
        console.log("hay un error en dataDayWorker, no entra");
      }
    };
    dataDaysWorker();

    const fetchRecidencePlace = async () => {
      try {
        const response = await axios.get("/api/places/recidencePlace");
        setDataRecidence(response.data.recidencePlace);
      } catch (error) {
        console.log("hay un error en fetchRecidencePlace, no entra");
      }
    };
    fetchRecidencePlace();

    const fetchWorkPlace = async () => {
      try {
        const response = await axios.get("/api/places/workPlace");
        setDataWorkPlace(response.data.workPlace);
      } catch (error) {
        console.log("hay un error en fetchWorkPlace, no entra");
      }
    };
    fetchWorkPlace();

    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/api/routesCost");
        setDataRoutes(response.data.routes);
      } catch (error) {
        console.log("hay un error en fetchWorkPlace, no entra");
      }
    };
    fetchRoutes();
  }, [
    showingWorkerRegisterForm,
    value,
    showingWorkerDayForm,
    showingEditWorker,
    showingEditWorkerDay,
    showingPlaceWorkerDay,
    showingPlaceRecidence,
    showingRouteCost,
    showingEditRouteCost,
  ]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(workerRegisterForm());
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(workerDayForm());
  };

  const handleClick3 = (element, e) => {
    e.preventDefault();
    dispatch(editWorkerForm());
    setDataWorker(element);
  };

  const handleClick4 = (element, e) => {
    e.preventDefault();
    dispatch(editWorkerDay());
    setDataWorkerDay(element);
  };

  const handleClick5 = (event) => {
    event.preventDefault();
    dispatch(placeWorkerDay());
  };

  const handleClick6 = (event) => {
    event.preventDefault();
    dispatch(placeRecidence());
  };

  const handleClick7 = (event) => {
    event.preventDefault();
    dispatch(routeCost());
  };

  const handleClick8 = (element, e) => {
    e.preventDefault();
    dispatch(editRouteCost());
    setDataRoute(element);
  };

  const rows = dataWorkers

    ?.map((element) => {
      const dinerCopAdmin = new Intl.NumberFormat("es-MX").format(
        element.salary
      );

      function reserveStatus() {
        if (element.reservedStatus === 1) {
          return "Activa";
        }
        if (element.reservedStatus === 2) {
          return "Check In";
        }
        if (element.reservedStatus === 3) {
          return "Check Out";
        }
        if (element.reservedStatus === 4) {
          return "No Show";
        }
      }
      const status = reserveStatus();
      const dateOfAdmission = `${dayjs(element.dateOfAdmission)
        .$d.toString()
        .substr(4, 11)}`;
      const place = element.placeOfResidence[0];

      return (
        <tr key={element._id} onClick={(e) => handleClick3(element, e)}>
          <td>{element.firstName}</td>
          <td>{element.lastName}</td>
          <td>{element.email}</td>
          <td>{element.numer}</td>
          <td>{dateOfAdmission}</td>
          <td>$ {dinerCopAdmin}</td>
          <td>{element.positionInTheCompany}</td>
          <td>{element.healthProvider} </td>
          <td>{element.pensionProvider}</td>
          <td>{element.compensationBox}</td>
          <td>{element.occupationalRiskInsurer}</td>
          <td>{element.activeEmployee ? <p>Activo</p> : <p>Retirado</p>}</td>
          {place && <td>{place.placeName}</td>}
        </tr>
      );
    })
    .reverse();

  const rows2 = dataDaysWorkes

    ?.map((element) => {
      const workDay = `${dayjs(element.workDay).$d.toString().substr(3, 13)} 
      ${week[dayjs(element.workDay).$W]}`;
      const entryTime = `${dayjs(element.entryTime)
        .$d.toString()
        .substr(16, 9)}`;
      const departureTime = `${dayjs(element.departureTime)
        .$d.toString()
        .substr(16, 9)}`;
      const place = element.placeOfWork[0];
      console.log("esto es place", element);
      return (
        <tr key={element._id} onClick={(e) => handleClick4(element, e)}>
          <td>{workDay}</td>
          <td>{entryTime}</td>
          <td>{departureTime}</td>

          <td>{element.hoursWorked}</td>

          <td>{element.lunch ? <p>Si</p> : <p>No</p>}</td>

          <td>{element.extraHours}</td>

          <td>{element.mustHours} </td>

          <td>{element.nightHours}</td>

          <td>{element.holiday ? <p>Si</p> : <p>No</p>}</td>

          <td>{element.vacations}</td>

          <td>{element.inability}</td>

          {place && <td>{place.placeName}</td>}
        </tr>
      );
    })
    .reverse();

  const RecidencePlaces = dataRecidence

    ?.map((element) => {
      return (
        <tr key={element._id}>
          <td>{element.placeName}</td>
        </tr>
      );
    })
    .reverse();

  const WorksPlaces = dataWorkPlace

    ?.map((element) => {
      return (
        <tr key={element._id}>
          <td>{element.placeName}</td>
        </tr>
      );
    })
    .reverse();

  const RoutesSubsidy = dataRoutes

    ?.map((element) => {
      const dinerCopAdmin = new Intl.NumberFormat("es-MX").format(
        element.subsidy
      );
      return (
        <tr key={element._id} onClick={(e) => handleClick8(element, e)}>
          <td>{element.firstPlace[0].placeName}</td>
          <td>{element.secondPlace[0].placeName}</td>
          <td>$ {dinerCopAdmin}</td>
        </tr>
      );
    })
    .reverse();

  console.log("esto es dataRoutes", dataRoutes);

  return (
    <div className={styles.container}>
      <div className={styles.container__data}>
        <div className={styles.data__dataUser}>
          <h1>Bienvenido a la consola de control</h1>
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
      <div>
        <Tabs variant="outline">
          <Tabs.List>
            <Tabs.Tab value="Workers" icon={<BrandBooking size={16} />}>
              Trabajadores
            </Tabs.Tab>
            <Tabs.Tab value="Calendar" icon={<BrandBooking size={16} />}>
              Calendario
            </Tabs.Tab>
            <Tabs.Tab value="Variables" icon={<BrandBooking size={16} />}>
              Variables
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Workers" pt="md">
            <div className={styles.dataWorkers}>
              <h4>Aca pudes listar tus empleados, crear y eliminarlos</h4>
              <div className={styles.data__buttonNewWorker}>
                <button onClick={handleClick}>Crear Trabajador</button>
              </div>
            </div>
            <div className={styles.tableOfWorkers}>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Número</th>
                    <th>Ingreso</th>
                    <th>Salario</th>
                    <th>Cargo</th>
                    <th>EPS</th>
                    <th>Pensiones</th>
                    <th>Caja Compensación</th>
                    <th>ARL</th>
                    <th>Estado</th>
                    <th>Recidencia</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Calendar" pt="md">
            <div></div>
            <div className={styles.dataWorkers}>
              <h4>Acá pudes asignar los días trabajados a tus empleados</h4>
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
              <div className={styles.data__buttonNewWorker}>
                <button onClick={handleClick2}>Crear Día Trabajado</button>
              </div>
            </div>
            <div className={styles.tableOfWorkers}>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Día Trabajado</th>
                    <th>Hora Entrada</th>
                    <th>Hora Salida</th>
                    <th>Horas Trabajadas</th>
                    <th>Almuerzo Completo</th>
                    <th>Horas Extras</th>
                    <th>Horas que Debe</th>
                    <th>Horas Nocturnas</th>
                    <th>Día Festivo</th>
                    <th>En Vacaciones</th>
                    <th>Incapacitado</th>
                    <th>Lugar de Trabajo</th>
                  </tr>
                </thead>
                <tbody>{rows2}</tbody>
              </Table>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Variables" pt="md">
            <div className={styles.variables__dataWorkers}>
              <div className={styles.dataWorkers__variables}>
                <button onClick={handleClick6}>
                  Crear Lugar de Recidencia
                </button>
              </div>
              <div className={styles.dataWorkers__variables}>
                <button onClick={handleClick7}>Crear Recorrido</button>
              </div>
              <div className={styles.dataWorkers__variables}>
                <button onClick={handleClick5}>Crear Lugar de Trabajo</button>
              </div>
            </div>
            <Divider />
            <div className={styles.data__workerDays}>
              <div className={styles.tableOfPlaces}>
                {dataRecidence && (
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Lugares de Recidencia</th>
                      </tr>
                    </thead>
                    <tbody>{RecidencePlaces}</tbody>
                  </Table>
                )}
              </div>

              <div className={styles.tableOfRoutes}>
                {dataWorkPlace && (
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Lugares de Recidencia</th>
                        <th>Lugares de Trabajo</th>
                        <th>Subsidio</th>
                      </tr>
                    </thead>
                    <tbody>{RoutesSubsidy}</tbody>
                  </Table>
                )}
              </div>
              <div className={styles.tableOfPlaces}>
                {dataWorkPlace && (
                  <Table striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Lugares de Trabajo</th>
                      </tr>
                    </thead>
                    <tbody>{WorksPlaces}</tbody>
                  </Table>
                )}
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      <PublicModal
        opened={showingWorkerRegisterForm}
        onClose={() => dispatch(workerRegisterForm())}
        size={largeScreen ? "60%" : "100%"}
      >
        <WorkerForm data={dataRecidence} />
      </PublicModal>
      <PublicModal
        opened={showingEditWorker}
        onClose={() => dispatch(editWorkerForm())}
        size={largeScreen ? "60%" : "100%"}
      >
        <EditWorkerForm data={dataWorker} />
      </PublicModal>
      <PublicModal
        opened={showingWorkerDayForm}
        onClose={() => dispatch(workerDayForm())}
        size={largeScreen ? "60%" : "100%"}
      >
        <WorkerDay idWorker={value} data={dataWorkPlace} />
      </PublicModal>
      <PublicModal
        opened={showingEditWorkerDay}
        onClose={() => dispatch(editWorkerDay())}
        size={largeScreen ? "60%" : "100%"}
      >
        <EditWorkerDay data={dataWorkerDay} />
      </PublicModal>
      <PublicModal
        opened={showingPlaceWorkerDay}
        onClose={() => dispatch(placeWorkerDay())}
        size={largeScreen ? "40%" : "100%"}
      >
        <PlaceOfWork />
      </PublicModal>
      <PublicModal
        opened={showingPlaceRecidence}
        onClose={() => dispatch(placeRecidence())}
        size={largeScreen ? "40%" : "100%"}
      >
        <RecidenceWorker />
      </PublicModal>
      <PublicModal
        opened={showingRouteCost}
        onClose={() => dispatch(routeCost())}
        size={largeScreen ? "40%" : "100%"}
      >
        <RouteCost workPlace={dataWorkPlace} recidence={dataRecidence} />
      </PublicModal>
      <PublicModal
        opened={showingEditRouteCost}
        onClose={() => dispatch(editRouteCost())}
        size={largeScreen ? "40%" : "100%"}
      >
        <EditRouteCost
          workPlace={dataWorkPlace}
          recidence={dataRecidence}
          route={dataRoute}
        />
      </PublicModal>
    </div>
  );
}
