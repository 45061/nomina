import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../styles/components/Navbar.module.scss";

import MenuNavbar from "./MenuNavbar";

export default function Navbar() {
  const { isAuth } = useSelector((state) => state.authReducer);

  return (
    <div className={styles.container}>
      <Link href="/" prefetch={false}>
        <h2>Nomina App</h2>
      </Link>
      <div className={styles.container__nav}>
        {isAuth ? (
          <Link href="/management" prefetch={false}>
            <h3>Gestión</h3>
          </Link>
        ) : (
          <div></div>
        )}
        <h3>Informe</h3>
        <MenuNavbar />
      </div>
    </div>
  );
}
