import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from 'auth/AuthProvider';

import roles from 'constants/roles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { ExitToApp, AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import UserDialog from './UserDialog';
import UserSearch from './UserSearch';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },
  title: {
    margin: theme.spacing(1),
  },
  tobbarButton: {
    marginRight: theme.spacing(1),
  },
  actionButtonsContainer: {
    marginLeft: 'auto'
  }
}));

export default () => {
  const history = useHistory();

  if (history.location.pathname === '/auth') {
    return null;
  }
  const authProvider = useAuthContext();
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setProfileDialogOpen(false), [setProfileDialogOpen]);

  const logoutHandler = useCallback(() => { }, []);
  const editProfileHandler = useCallback(() => setProfileDialogOpen(true), [setProfileDialogOpen]);


  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Calories tracker
        </Typography>

        <UserDialog
          isOpen={isProfileDialogOpen}
          onClose={closeDialog}
        />
        <UserSearch></UserSearch>

        <div className={classes.actionButtonsContainer}>
          <Button
            color="inherit"
            variant="outlined"
            aria-label="My meals"
            className={classes.tobbarButton}
            onClick={() => history.push("/meals")}
          >
            Add meal
              </Button>

          <Button
            color="inherit"
            variant="outlined"
            aria-label="Edit profile"
            className={classes.tobbarButton}
            onClick={editProfileHandler}
          >
            <AccountCircle />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            aria-label="Logout"
            className={classes.tobbarButton}
            onClick={logoutHandler}
          >
            <ExitToApp onClick={() => authProvider.actions.logout()} />
          </Button>
        </div>

      </Toolbar>
    </AppBar>
  );
};
