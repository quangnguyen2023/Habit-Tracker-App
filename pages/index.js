import { useState } from "react";
import Head from "next/head";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import HabitCheckerItem from "../components/HabitCheckerItem";
import styles from "../styles/HabitChecker.module.css";

export default function HabitChecker() {
  const [month, setMonth] = useState(new Date().getMonth());

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

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
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="Month"
              onChange={handleChange}
            >
              <MenuItem value={0}> Tháng 1 </MenuItem>
              <MenuItem value={1}> Tháng 2 </MenuItem>
              <MenuItem value={2}> Tháng 3 </MenuItem>
              <MenuItem value={3}> Tháng 4 </MenuItem>
              <MenuItem value={4}> Tháng 5 </MenuItem>
              <MenuItem value={5}> Tháng 6 </MenuItem>
              <MenuItem value={6}> Tháng 7 </MenuItem>
              <MenuItem value={7}> Tháng 8 </MenuItem>
              <MenuItem value={8}> Tháng 9 </MenuItem>
              <MenuItem value={9}> Tháng 10 </MenuItem>
              <MenuItem value={10}> Tháng 11 </MenuItem>
              <MenuItem value={11}> Tháng 12 </MenuItem>
            </Select>
          </FormControl>
          <HabitCheckerItem month={month} />
        </div>
      </main>
    </div>
  );
}
