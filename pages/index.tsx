import { Inter } from "@next/font/google";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Description from "./Description";
import PtsCanvas from "./PtsCanvas";
import Purchase from "./Purchase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>unco.design</title>
        <meta name="description" content="unco.design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Description />
        <PtsCanvas />
        <Purchase />
      </main>
    </>
  );
}
