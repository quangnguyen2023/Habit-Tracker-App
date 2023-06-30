import styles from './HabitCheckerItem.module.css';

export default function HabitCheckerItem({ month }) {
  const weekDays  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const days = () => {
    let arr = [];
    let year = new Date().getFullYear();
    let lastDayPrevMonth = new Date(year, month, 0);
    let numberOfDays = new Date(year, month + 1, 0).getDate();
    let lastDayOfWeekPrevMonth = lastDayPrevMonth.getDay();
    let dayOfWeekFirstDay = lastDayOfWeekPrevMonth === 6 ? 0 : lastDayOfWeekPrevMonth + 1;

    // add white space before first day of month
    for (let i = 0; i < dayOfWeekFirstDay; i++) {
      arr.push('');
    }

    for (let i = 1; i <= numberOfDays; i++) {
      arr.push(i);
    }

    return arr;
  }

  return(
    <div className={styles['habit-checker__item']}>
      <h2> Ngoại Ngữ </h2>
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          { weekDays.map((weekday, index) =>
            <span className={styles.weekday} key={index}> {weekday} </span>)
          }
        </div>
        <div className={styles.days}>
          { days().map((day, index) =>
            <span className={`${day ? styles.day : ''}`} key={index}>
              {day}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}