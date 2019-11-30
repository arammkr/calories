import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Paper,
  Box,
} from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { useUserContext } from 'context/User';
import { makeStyles } from '@material-ui/core/styles';
import { formatTime } from 'utils';
import dayjs from 'dayjs';

const TIME = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  MANUALLY: 'manually',
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
  timeBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

const DateTimePicker = () => {
  const [from, setFrom] = useState(dayjs().subtract(30, 'days'));
  const [minDate, setMinDate] = useState(dayjs().subtract(30, 'days'));
  const [maxDate, setMaxDate] = useState(dayjs().subtract(1, 'days'));
  const [to, setTo] = useState(dayjs());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeFrom, setTimeFrom] = React.useState(null);
  const [timeTo, setTimeTo] = React.useState(null);
  const [openTime, setOpenTime] = React.useState(false);
  const [chosenTime, setChosenTime] = React.useState(null);
  const [timeError, setTimeError] = React.useState(false);
  const classes = useStyles();

  const userProvider = useUserContext();

  const toggleManualTime = useCallback(() => {
    setOpenTime(!openTime);
    setAnchorEl(null);
  }, [openTime]);

  const setBreakfast = () => {
    setTimeFrom(formatTime('07:00'));
    setTimeTo(formatTime('12:00'));
  };

  const setLunch = () => {
    setTimeFrom(formatTime('13:00'));
    setTimeTo(formatTime('15:00'));
  };

  const setDinner = () => {
    setTimeFrom(formatTime('18:00'));
    setTimeTo(formatTime('22:00'));
  };

  const handleTimeToChange = time => {
    setTimeError(time <= timeFrom);
    setTimeTo(time);
  };

  const handleTimeFromChange = time => {
    setTimeError(time >= timeTo);
    setTimeFrom(time);
  };

  const handleUpdateClick = () => {
    userProvider.actions.updateDateRange({ from, to, timeFrom, timeTo });
  };

  useEffect(() => {
    if (!chosenTime) {
      return;
    }

    switch (chosenTime) {
      case TIME.BREAKFAST:
        setBreakfast();
        break;
      case TIME.LUNCH:
        setLunch();
        break;
      case TIME.DINNER:
        setDinner();
        break;
      default:
    }
  }, [chosenTime]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const resetTime = () => {
    setChosenTime(null);
    setTimeFrom(null);
    setTimeTo(null);
    setAnchorEl(null);
  };

  const handleClose = time => {
    setChosenTime(time);
    setAnchorEl(null);
  };

  const handleFromDateChange = date => {
    setFrom(date);
  };

  const handleToDateChange = date => {
    const minimumDate = date.subtract(30, 'days');
    if (date < from) {
      setFrom(minimumDate);
    }

    setMinDate(minimumDate);
    setMaxDate(date.subtract(1, 'days'));
    setTo(date);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="body1">Date From</Typography>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            InputAdornmentProps={{ position: 'start' }}
            value={from}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleFromDateChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Date To</Typography>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            disableFuture
            value={to}
            InputAdornmentProps={{ position: 'start' }}
            onChange={handleToDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            flexDirection="row"
            alignItems="center"
            className={classes.timeBox}
          >
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<AlarmIcon />}
              variant="contained"
              color="secondary"
            >
              Time
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={() => handleClose(TIME.BREAKFAST)}>
                Breakfast
              </MenuItem>
              <MenuItem onClick={() => handleClose(TIME.LUNCH)}>Lunch</MenuItem>
              <MenuItem onClick={() => handleClose(TIME.DINNER)}>
                Dinner
              </MenuItem>
              <MenuItem onClick={toggleManualTime}>
                Set exact time range
              </MenuItem>
              <MenuItem onClick={resetTime}>Reset time</MenuItem>
            </Menu>
            {timeError && (
              <Typography color="error" variant="inline">
                Invalid
              </Typography>
            )}
            {!openTime && chosenTime && (
              <Typography variant="body1">{chosenTime} time</Typography>
            )}
            {openTime && (
              <>
                <KeyboardTimePicker
                  ampm={false}
                  variant="inline"
                  value={timeFrom}
                  onChange={handleTimeFromChange}
                />
                <KeyboardTimePicker
                  ampm={false}
                  variant="inline"
                  value={timeTo}
                  onChange={handleTimeToChange}
                />
              </>
            )}

            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleUpdateClick}
              variant="contained"
              color="secondary"
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DateTimePicker;
