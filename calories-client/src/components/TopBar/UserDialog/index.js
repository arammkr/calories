import React, { useState, useCallback } from 'react';
import { useAuthContext } from 'auth/AuthProvider';
import Fetch from 'utils/fetch';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

const fields = ['email', 'caloriesPerDay', 'nick', 'firstName', 'lastName'];
const defaultState = fields.reduce((acc, key) => (acc[key] = '', acc), {}); // eslint-disable-line

export default function MealFilterDialog({ isOpen, onClose }) {
  const authProvider = useAuthContext();
  const {
    state: { auth },
  } = authProvider;

  const [formData, setFormData] = useState(defaultState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFieldChange = useCallback(
    e => setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData],
  );
  const handleSubmit = useCallback(async () => {
    const filteredFormData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    try {
      await Fetch.put({ path: `/user/${auth.id}`, body: filteredFormData });
      authProvider.actions.updateMe();
      onClose();
      setFormData(defaultState);
    } catch (err) {
      if (err.status === 422) {
        setError(err.payload);
      } else if (err.message) {
        setErrorMessage(err.message);
      }
    }
  }, [formData, authProvider.actions, onClose, auth.id]);

  return (
    <Dialog open={isOpen} keepMounted fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle id="alert-dialog-slide-title">
        Edit profile information
      </DialogTitle>
      <DialogContent>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          defaultValue={auth.email}
          error={!!error.email}
          helperText={error.email}
          autoFocus
          onChange={handleFieldChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nick"
          name="nick"
          defaultValue={auth.nick}
          error={!!error.nick}
          helperText={error.nick}
          autoFocus
          onChange={handleFieldChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="First Name"
          name="firstName"
          defaultValue={auth.firstName}
          error={!!error.firstName}
          helperText={error.firstName}
          autoFocus
          onChange={handleFieldChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Last Name"
          name="lastName"
          defaultValue={auth.lastName}
          error={!!error.lastName}
          helperText={error.lastName}
          autoFocus
          onChange={handleFieldChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          label="Calories per day"
          name="caloriesPerDay"
          defaultValue={auth.caloriesPerDay}
          error={!!error.caloriesPerDay}
          helperText={error.caloriesPerDay}
          autoFocus
          onChange={handleFieldChange}
        />
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
}
