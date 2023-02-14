import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>NominaApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
