import React, { useState, useCallback } from 'react';
import { Container, Grid, TextField, Button, Typography,Avatar, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'auth/AuthProvider';

const fields = ['email', 'password', 'caloriesPerDay', 'nick', 'firstName', 'lastName'];
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
}));

export default ({ goToLogin }) => {
  const authProvider = useAuthContext();
  const classes = useStyles();
  const [formData, setFormData] = useState(defaultState);

  const handleFieldChange = useCallback(e => setFormData({ ...formData, [e.target.name]: e.target.value }), [formData]);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    authProvider.actions.signup(formData);
  }, [formData]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {authProvider.state.error && <Typography color="error">{authProvider.state.error}</Typography>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={authProvider.state.validationError['email']}
            helperText={authProvider.state.validationError['email']}
            autoFocus
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nick"
            label="Nick name"
            name="nick"
            error={authProvider.state.validationError['nick']}
            helperText={authProvider.state.validationError['nick']}
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            error={authProvider.state.validationError['firstName']}
            helperText={authProvider.state.validationError['firstName']}
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            error={authProvider.state.validationError['lastName']}
            helperText={authProvider.state.validationError['lastName']}
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="caloriesPerDay"
            label="Calories per day"
            name="caloriesPerDay"
            error={authProvider.state.validationError['caloriesPerDay']}
            helperText={authProvider.state.validationError['caloriesPerDay']}
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
            error={authProvider.state.validationError['password']}
            helperText={authProvider.state.validationError['password']}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={e => {
                e.preventDefault();
                goToLogin();
              }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}