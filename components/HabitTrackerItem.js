import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

import styles from './HabitTrackerItem.module.css';

export default function HabitTrackerItem({ month, habitTitle, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days = (() => {
    let arr = [];
    let year = new Date().getFullYear();
    let lastDayPrevMonth = new Date(year, month, 0);
    let numberOfDays = new Date(year, month + 1, 0).getDate();
    let lastDayOfWeekPrevMonth = lastDayPrevMonth.getDay();
    let dayOfWeekFirstDay = lastDayOfWeekPrevMonth === 6 ? 0 : lastDayOfWeekPrevMonth + 1;

    // add white space before first day of month
    for (let i = 1; i < dayOfWeekFirstDay; i++) {
      arr.push('');
    }
    // add the days of month
    for (let i = 1; i <= numberOfDays; i++) {
      arr.push(i);
    }

    return arr;
  })();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles['habit-tracker__item']}>
      <div className={styles.header}>
        <h2 className={styles['habit-title']}> {habitTitle} </h2>
        <Tooltip title="More actions">
          <IconButton
            size="small"
            className={styles['more-actions-btn']}
            sx={{ opacity: open ? '1 !important' : 0 }}
            aria-controls={open ? 'more-actions' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="more-actions"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={onDelete} sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteIcon fontSize="small" />
            <Box component="span" ml={2}>
              Delete Habit
            </Box>
          </MenuItem>

          <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon fontSize="small" />
            <Box component="span" ml={2}>
              Update Habit Title
            </Box>
          </MenuItem>
        </Menu>
      </div>

      {/* Calendar */}
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {weekDays.map((weekday, index) => (
            <span className={styles.weekday} key={index}>
              {weekday}
            </span>
          ))}
        </div>
        <div className={styles.days}>
          {days.map((day, index) => (
            <span className={`${day ? styles.day : ''}`} key={index}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
