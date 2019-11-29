import React, { useState, useCallback, useEffect } from 'react';
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { formatTime, formatDate, getDate, getTime } from 'utils';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

const fields = ['name', 'calories', 'protein', 'carbs', 'fat', 'date', 'time'];
const defaultState = fields.reduce((acc, key) => (acc[key] = '', acc), {}); // eslint-disable-line

export default ({ meal, onClose, isOpen, onSubmit }) => {
  const [formData, setFormData] = useState(defaultState);
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!meal) return;
    const state = fields.reduce((acc, key) => {
      switch(key) {
        case 'date':
          acc[key] = formatDate(meal['date']);
          break;
        case 'time':
          acc[key] = formatTime(meal['time']);
          break;
        default: 
          acc[key] = meal[key];
      }
      return acc;
    }, {});

    console.log(state, meal);
    setFormData(state)
  }, [meal])

  const handleFieldChange = useCallback(e => setFormData({ ...formData, [e.target.name]: e.target.value }), [formData]);

  const handleDateChange = useCallback((date) => {
    setFormData({...formData, date});
  });

  const handleTimeChange = useCallback((time) => {
    setFormData({...formData, time});
  });

  const handleSubmit = useCallback(() => { 
    const data = {...formData, date: getDate(formData['date']), time: getTime(formData['time']) }
    onSubmit(data);
  }, [formData]);

  return <Dialog
    open={isOpen}
    keepMounted
    fullWidth={true}
    maxWidth="sm"
    onClose={onClose}
  >
    <DialogTitle id="alert-dialog-slide-title">Edit meal</DialogTitle>
    <DialogContent>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {
        fields.map((field, index) => {
          return (!['date', 'time'].includes(field) &&
            <TextField
              key={index}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={field}
              name={field}
              value={formData[field]}
              error={!!error[field]}
              helperText={error[field]}
              autoFocus
              onChange={handleFieldChange}
            />
            || (field === 'date' &&
              <KeyboardDatePicker
                key={index}
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                InputAdornmentProps={{ position: "start" }}
                value={formData['date']}
                defaultValue={formData['date']}
                onChange={handleDateChange}
              />)
            || (field === 'time' &&
              <KeyboardTimePicker
                key={index}
                ampm={false}
                variant="inline"
                value={formData['time']}
                onChange={handleTimeChange}
              />
            ))
        })
      }

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

}
