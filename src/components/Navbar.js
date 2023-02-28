import Link from "next/link";
import styles from "../styles/components/Navbar.module.scss";

import MenuNavbar from "./MenuNavbar";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Link href="/" prefetch={false}>
        <h2>Nomina App</h2>
      </Link>
      <div className={styles.container__nav}>
        <Link href="/management" prefetch={false}>
          <h3>Gestión</h3>
        </Link>
        <h3>Informe</h3>
        <MenuNavbar />
      </div>
    </div>
  );
}
