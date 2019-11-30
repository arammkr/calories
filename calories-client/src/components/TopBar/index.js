import React, { useCallback, useState } from 'react';
import { useAuthContext } from 'auth/AuthProvider';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { ExitToApp, AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import UserDialog from './UserDialog';
import UserSearch from './UserSearch';
import MealDialog from 'components/Meal/MealDialog';
import { useUserContext } from 'context/User';
import roles from 'constants/roles';
import history from 'utils/history';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  title: {
    margin: theme.spacing(1),
  },
  tobbarButton: {
    marginRight: theme.spacing(1),
  },
  actionButtonsContainer: {
    marginLeft: 'auto',
  },
}));

export default () => {
  const authProvider = useAuthContext();
  const userProvider = useUserContext();

  const [mealErrors, setMealErrors] = useState({});

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setProfileDialogOpen(false), [
    setProfileDialogOpen,
  ]);

  const logoutHandler = useCallback(() => {}, []);
  const editProfileHandler = useCallback(() => setProfileDialogOpen(true), [
    setProfileDialogOpen,
  ]);

  const [isMealDialogOpen, setIsMealDialogOpen] = useState(false);
  const toggleAddMeal = useCallback(() => {
    setIsMealDialogOpen(!isMealDialogOpen);
    setMealErrors({});
  }, [isMealDialogOpen]);

  const classes = useStyles();

  const addMeal = async meal => {
    try {
      setMealErrors({});
      await userProvider.actions.addUserMeal({
        ...meal,
        userId: authProvider.state.auth.id,
      });
      if (userProvider.state.isMe) {
        await userProvider.actions.getUserAvgNutrition();
        await userProvider.actions.getUserMeals();
        await userProvider.actions.getDailyMeals();
      }
      toggleAddMeal();
    } catch (e) {
      if (e.status === 422) {
        setMealErrors(e.payload);
      }
    }
  };

  if (!authProvider.state.isLogedIn) {
    return null;
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Button
          onClick={e => {
            e.preventDefault();
            history.push(`/user/${authProvider.state.auth.id}`);
          }}
        >
          Calories tracker
        </Button>

        <UserSearch />
        <UserDialog isOpen={isProfileDialogOpen} onClose={closeDialog} />
        <MealDialog
          isOpen={isMealDialogOpen}
          onClose={toggleAddMeal}
          onSubmit={addMeal}
          errors={mealErrors}
        />
        <div className={classes.actionButtonsContainer}>
          {[roles.ADMIN, roles.MANAGER].includes(
            authProvider.state.auth.role.role,
          ) && (
            <Button
              color="inherit"
              variant="outlined"
              aria-label="My meals"
              className={classes.tobbarButton}
              onClick={() => history.push('/users')}
            >
              Users
            </Button>
          )}

          <Button
            color="inherit"
            variant="outlined"
            aria-label="My meals"
            className={classes.tobbarButton}
            onClick={toggleAddMeal}
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
