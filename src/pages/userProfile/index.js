/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import profileHandler from "../api/user/profile";
// import fetchProfile from "../../pages/api/getData";
import { useEffect, useState } from "react";
import styles from "../../styles/pages/userProfile.module.scss";
import { Tabs, Table, Divider } from "@mantine/core";
import { BrandBooking } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import PublicModal from "@/components/PublicModal";
import { workerRegisterForm } from "@/store/actions/modalAction";
import WorkerForm from "@/components/WorkerForm";
import { useMediaQuery } from "@mantine/hooks";

export default function userProfile() {
  const { user } = useSelector((state) => state.authReducer);
  const { showingWorkerRegisterForm } = useSelector(
    (state) => state.modalReducer
  );

  const dispatch = useDispatch();

  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const [dataBookings, setDataBookings] = useState([]);
  // const thisUser = JSON.parse(userInfo);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const response = await axios.get("/api/user/profile");
  //     setAuth(response.data);
  //     // dispatch(showLoginForm());
  //   };
  //   getUser();

  //   const fetchBooking = async () => {
  //     await fetch("/api/booking", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         setDataBookings(data);
  //       });
  //   };
  //   fetchBooking();
  // }, []);

  // console.log("esto es auth", auth);

  // const rows = dataBookings.bookings

  //   ?.map((element) => {
  //     const dinerCopAdmin = new Intl.NumberFormat("es-MX").format(
  //       element.reservedDays * element.userBookingId?.price
  //     );
  //     const dinerCopUser = new Intl.NumberFormat("es-MX").format(
  //       element.reservedDays * element.roomId?.price
  //     );

  //     function reserveStatus() {
  //       if (element.reservedStatus === 1) {
  //         return "Activa";
  //       }
  //       if (element.reservedStatus === 2) {
  //         return "Check In";
  //       }
  //       if (element.reservedStatus === 3) {
  //         return "Check Out";
  //       }
  //       if (element.reservedStatus === 4) {
  //         return "No Show";
  //       }
  //     }
  //     const status = reserveStatus();
  //     return (
  //       dataBookings.bookings && (
  //         <tr key={element._id}>
  //           <td>{element.roomId.roomNumer}</td>
  //           <td>{element.checkIn}</td>
  //           <td>{element.checkOut}</td>
  //           {element.userBookingId ? (
  //             <td>
  //               {element.userBookingId.firstName}{" "}
  //               {element.userBookingId.lastName}
  //             </td>
  //           ) : (
  //             <td>
  //               {element.userId.firstName} {element.userId.lastName}
  //             </td>
  //           )}

  //           {element.userId ? (
  //             <td>{element.userId.numer}</td>
  //           ) : (
  //             <td>{element.userBookingId.numer}</td>
  //           )}
  //           {element.userBookingId ? (
  //             <td>{element.userBookingId.email}</td>
  //           ) : (
  //             <td>{element.userId.email} </td>
  //           )}
  //           <td>{element.reservedDays}</td>
  //           {element.userBookingId?.price ? (
  //             <td>$ {dinerCopAdmin}</td>
  //           ) : (
  //             <td>$ {dinerCopUser}</td>
  //           )}
  //           <td>
  //             {element.reservedStatus ? <p>{status}</p> : <p>Cancelada</p>}
  //           </td>
  //           <td>
  //             {element.userId.firstName} {element.userId.lastName}
  //           </td>
  //         </tr>
  //       )
  //     );
  //   })
  //   .reverse();

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(workerRegisterForm());
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
            <div>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Habitación</th>
                    <th>CheckIn</th>
                    <th>CheckOut</th>
                    <th>Huesped</th>
                    <th>Número Contacto</th>
                    <th>Correo</th>
                    <th>Noches Reservadas</th>
                    <th>Valor Reserva</th>
                    <th>Estado de reserva</th>
                    <th>Modificado Por</th>
                  </tr>
                </thead>
                {/* <tbody>{rows}</tbody> */}
              </Table>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Calendar" pt="md">
            Calendar tab content
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
