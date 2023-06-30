import Calendar from "./Calendar";
import styles from "./HabitChecker.module.css";

export default function HabitChecker() {
  return (
    <div className={styles["habit-checker"]}>
      <span className="month"> Tháng 6 </span>
      <h2> Ngoại Ngữ </h2>
      <Calendar />
    </div>
  );
}
