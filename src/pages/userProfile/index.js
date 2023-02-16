/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import profileHandler from "../api/user/profile";
// import fetchProfile from "../../pages/api/getData";
import { useEffect, useState } from "react";
import styles from "../../styles/pages/userProfile.module.scss";
import { Tabs, Table, Select } from "@mantine/core";
import { BrandBooking } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import PublicModal from "@/components/PublicModal";
import { workerDayForm, workerRegisterForm } from "@/store/actions/modalAction";
import WorkerForm from "@/components/WorkerForm";
import { useMediaQuery } from "@mantine/hooks";
import { fetchWorker } from "@/store/actions/workerAction";
import WorkerDay from "@/components/WorkerDay";

export default function userProfile() {
  const { user } = useSelector((state) => state.authReducer);
  const { showingWorkerRegisterForm, showingWorkerDayForm } = useSelector(
    (state) => state.modalReducer
  );

  const dispatch = useDispatch();

  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const [dataWorkers, setDataWorkes] = useState([]);
  const [value, setValue] = useState(null);
  // const thisUser = JSON.parse(userInfo);

  useEffect(() => {
    // const getUser = async () => {
    //   const response = await axios.get("/api/user/profile");
    //   setAuth(response.data);
    //   // dispatch(showLoginForm());
    // };
    // getUser();

    const fetchWorker = async () => {
      try {
        const response = await axios.get("/api/workers/register");
        setDataWorkes(response.data.workers);
      } catch (error) {
        console.log("hay un error en fetchWorker, no entra");
      }
    };
    fetchWorker();

    // const workers = dispatch(fetchWorker());

    // const fetchBooking = async () => {
    //   await fetch("/api/booking", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       setDataBookings(data);
    //     });
    // };
    // fetchBooking();
  }, [showingWorkerRegisterForm]);
  console.log("estos son los trabajadores", dataWorkers);

  // console.log("esto es auth", auth);

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
      return (
        <tr key={element._id}>
          <td>{element.firstName}</td>
          <td>{element.lastName}</td>
          <td>{element.email}</td>

          <td>{element.numer}</td>

          <td>{element.dateOfAdmission}</td>

          <td>$ {dinerCopAdmin}</td>

          <td>{element.positionInTheCompany}</td>

          <td>{element.healthProvider} </td>

          <td>{element.pensionProvider}</td>

          <td>{element.compensationBox}</td>

          <td>{element.occupationalRiskInsurer}</td>

          <td>{element.activeEmployee ? <p>Activo</p> : <p>Retirado</p>}</td>
        </tr>
      );
    })
    .reverse();

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(workerRegisterForm());
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(workerDayForm());
  };

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
          </Tabs.Panel>
        </Tabs>
      </div>
      <PublicModal
        opened={showingWorkerRegisterForm}
        onClose={() => dispatch(workerRegisterForm())}
        size={largeScreen ? "60%" : "100%"}
      >
        <WorkerForm />
      </PublicModal>
      <PublicModal
        opened={showingWorkerDayForm}
        onClose={() => dispatch(workerDayForm())}
        size={largeScreen ? "60%" : "100%"}
      >
        <WorkerDay idWorker={value} />
      </PublicModal>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const dataUser = await axios.get("http://localhost:3000/api/user/profile");
//   console.log(dataUser.data);

//   const userInfo = dataUser.data;

//   // const userInfo = JSON.stringify(dataUser);

//   return { props: { userInfo } };
// }
