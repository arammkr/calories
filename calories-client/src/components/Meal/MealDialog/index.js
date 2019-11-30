import React, { useState, useCallback, useEffect } from 'react';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { formatTime, formatDate, getDate, getTime } from 'utils';
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import dayjs from 'dayjs';

const fields = ['name', 'calories', 'protein', 'carbs', 'fat', 'date', 'time'];
const fieldTypes = {
  name: 'text',
};

const useStyles = makeStyles(theme => ({
  datePicker: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const defaultState = () =>
  fields.reduce((acc, key) => {
    switch (key) {
      case 'date':
      case 'time':
        acc[key] = dayjs();
        break;
      default:
        acc[key] = '';
    }
    return acc;
}, {}); // eslint-disable-line

export default ({ meal, onClose, isOpen, onSubmit, errors = {} }) => {
  const [formData, setFormData] = useState(defaultState());

  useEffect(() => {
    if (!meal) return;
    const state = fields.reduce((acc, key) => {
      switch (key) {
        case 'date':
          acc[key] = formatDate(meal.date);
          break;
        case 'time':
          acc[key] = formatTime(meal.time);
          break;
        default:
          acc[key] = meal[key];
      }
      return acc;
    }, {});

    setFormData(state);
  }, [meal]);

  const handleFieldChange = useCallback(
    e => setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData],
  );

  const handleDateChange = useCallback(
    date => {
      setFormData({ ...formData, date });
    },
    [formData],
  );

  const handleTimeChange = useCallback(
    time => {
      setFormData({ ...formData, time });
    },
    [formData],
  );

  const handleSubmit = useCallback(() => {
    const data = {
      ...formData,
      date: getDate(formData.date),
      time: getTime(formData.time),
    };
    onSubmit(data);
  }, [formData, onSubmit]);

  const onExited = () => {
    setFormData(defaultState());
  };

  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      onExited={onExited}
    >
      <DialogTitle id="alert-dialog-slide-title">
        {!meal ? 'Add' : 'Edit'} meal
      </DialogTitle>
      <DialogContent>
        {fields.map(field => {
          return (
            (!['date', 'time'].includes(field) && (
              <TextField
                key={field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={field}
                type={fieldTypes[field] || 'number'}
                name={field}
                value={formData[field] || ''}
                error={!!errors[field]}
                helperText={errors[field]}
                autoFocus
                onChange={handleFieldChange}
              />
            )) ||
            (field === 'date' && (
              <div key={field}>
                <KeyboardDatePicker
                  autoOk
                  label="Date"
                  variant="inline"
                  className={classes.datePicker}
                  inputVariant="outlined"
                  InputAdornmentProps={{ position: 'start' }}
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </div>
            )) ||
            (field === 'time' && (
              <div key={field}>
                <KeyboardTimePicker
                  label="Time"
                  className={classes.datePicker}
                  ampm={false}
                  variant="inline"
                  value={formData.time}
                  onChange={handleTimeChange}
                />
              </div>
            ))
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
