import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";

import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isAuth } = useSelector((state) => state.authReducer);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Bienvenidos al Aplicativo de Nomina</h1>
          <div className={styles.container__info}>
            <div className={styles.info__data}>
              <h2>Manejo de nomina</h2>
              <p>
                En este aplicativo puedes realizar la gestión de la nómina
                mediante la gestión de la información diligenciada.
              </p>
            </div>
            <div className={styles.info__image}>
              <Image
                src="/work_image.jpg"
                alt="work image"
                width={725}
                height={473}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
