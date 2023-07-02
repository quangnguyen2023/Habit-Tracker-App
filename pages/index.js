import { useState } from 'react';
import Head from 'next/head';
import Grid from '@mui/system/Unstable_Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

import HabitCheckerItem from '../components/HabitCheckerItem';
import styles from '../styles/HabitChecker.module.css';

export default function HabitChecker() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleAddTitle = (e) => {
    if (newTitle.trim() === '') return;
    if (e.key && e.key !== 'Enter') return;

    // prevent browser submit form when press Enter in input field (TextField)
    e.preventDefault();

    setTitles((prevState) => [...prevState, newTitle]);
    setNewTitle('');
    setOpen(false);
  };

  const handleChangeNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Habit Tracker App</title>
      </Head>

      <main>
        <div className={styles['habit-checker']}>
          <Grid container p={2}>
            {/* Habits List */}
            <Grid lg={10.5} md={10} sm={8}>
              <Grid container spacing={8}>
                {titles.map((title) => (
                  <Grid xs={6}>
                    <HabitCheckerItem month={month} habitTitle={title} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Actions */}
            <Grid lg={1.5} md={2} sm={4} pl={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* "Month" Select */}
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Month"
                    onChange={handleChangeMonth}
                  >
                    <MenuItem value={0}> January </MenuItem>
                    <MenuItem value={1}> February </MenuItem>
                    <MenuItem value={2}> March </MenuItem>
                    <MenuItem value={3}> April </MenuItem>
                    <MenuItem value={4}> May </MenuItem>
                    <MenuItem value={5}> June </MenuItem>
                    <MenuItem value={6}> July </MenuItem>
                    <MenuItem value={7}> August </MenuItem>
                    <MenuItem value={8}> September </MenuItem>
                    <MenuItem value={9}> October </MenuItem>
                    <MenuItem value={10}> Novermber </MenuItem>
                    <MenuItem value={11}> December </MenuItem>
                  </Select>
                </FormControl>

                {/* "New Habit" button */}
                <Button variant="outlined" onClick={toggleDialog} sx={{ marginTop: 2 }}>
                  New Habit
                </Button>
                <Dialog open={open} onClose={toggleDialog} maxWidth="xs" fullWidth>
                  <DialogTitle> Add New Habit </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Habit Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={newTitle}
                      onChange={handleChangeNewTitle}
                      onKeyDown={handleAddTitle}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={toggleDialog}>Cancel</Button>
                    <Button onClick={handleAddTitle}>Add</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
}
