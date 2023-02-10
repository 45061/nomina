import styles from "../styles/components/Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <h2>Nomina App</h2>
      <div className={styles.container__nav}>
        <h3>Registro</h3>
        <h3>Gestión</h3>
        <h3>Informe</h3>
        <h3>Login</h3>
      </div>
    </div>
  );
}
