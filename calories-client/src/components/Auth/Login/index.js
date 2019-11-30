import React, { useState, useCallback } from 'react';
import {
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAuthContext } from 'auth/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';

const fields = ['email', 'password'];
const defaultState = fields.reduce((acc, key) => (acc[key] = '', acc), {}); // eslint-disable-line

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default props => {
  const [formData, setFormData] = useState(defaultState);
  const authProvider = useAuthContext();
  const classes = useStyles();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      authProvider.actions.login(formData);
    },
    [formData, authProvider.actions],
  );

  const handleFieldChange = useCallback(
    e => setFormData({ ...formData, [e.target.name]: e.target.value }),
    [formData],
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {authProvider.state.error && (
          <Typography color="error">{authProvider.state.error}</Typography>
        )}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            error={!!authProvider.state.validationError.email}
            helperText={authProvider.state.validationError.email}
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!authProvider.state.validationError.password}
            helperText={authProvider.state.validationError.password}
            onChange={handleFieldChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  props.goToSignUp();
                }}
              >
                Don&apos;t have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
