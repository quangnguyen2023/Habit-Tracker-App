import Head from "next/head";

import HabitCheckerItem from "../components/HabitCheckerItem";
import styles from "../styles/HabitChecker.module.css";

export default function HabitChecker() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Habit Checker App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <div className={styles["habit-checker"]}>
          <span className="month"> Tháng 6 </span>
          <HabitCheckerItem />
        </div>
      </main>
    </div>
  );
}
