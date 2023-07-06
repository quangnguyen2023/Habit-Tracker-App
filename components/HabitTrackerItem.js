import { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import styles from './HabitTrackerItem.module.css';

export default function HabitTrackerItem({ month, habitTitle, onDelete, onUpdateTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [previousHabitTitle, setPreviousHabitTitle] = useState('');
  const inputRef = useRef(null);

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

  //* auto focus when input element was displayed
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTitle = () => {
    // save the initial value of habitTitle before editing
    setPreviousHabitTitle(habitTitle);
    setIsEditing(true);
  };

  const handleBlurAndKeyDown = (e) => {
    if (e.key !== 'Enter' && e.type !== 'blur') return;
    if (e.target.value.trim() === '') {
      onUpdateTitle(previousHabitTitle);
    }
    setIsEditing(false);
  };

  return (
    <div className={styles['habit-tracker__item']}>
      {/* header */}
      <div className={styles.header}>
        {
          // prettier-ignore
          !isEditing
            ? <h2 className={styles['habit-title']}> {habitTitle} </h2>
            : <TextField 
                id="outlined-basic" 
                label="Habit Title" 
                variant="outlined" 
                size='small' 
                fullWidth
                value={habitTitle}
                onChange={(e) => onUpdateTitle(e.target.value)}
                onBlur={handleBlurAndKeyDown}
                onKeyDown={handleBlurAndKeyDown}
                inputRef={inputRef}
                sx={{ marginRight: 1 }}
              />
        }
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

          <MenuItem onClick={handleUpdateTitle} sx={{ display: 'flex', alignItems: 'center' }}>
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
