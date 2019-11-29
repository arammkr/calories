import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import UserDailyMeals from 'components/User/UserDailyMealList';
import UserCaloriesBar from 'components/User/UserCaloriesBar';
import UserNutritionPie from 'components/User/UserNutritionPie';
import UserCard from 'components/User/UserCard';
import DateTimePicker from 'components/User/DateTimePicker';
import UserContext, { UserProvider } from 'context/User';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <UserProvider>
      <div className={classes.root}>
        <UserContext.Consumer>
          {({
            state: {user, nutrition, dailyMeals, meals},
            actions: {handleBarClick}
          }) =>  (
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <UserCard user={user} />
                  <UserNutritionPie nutrition={nutrition} />
                </Grid>
                <Grid item xs={9}>
                  <DateTimePicker/>
                  <UserCaloriesBar handleBarClick={handleBarClick} meals={meals} caloriesPerDay={user && user.caloriesPerDay} />
                  <UserDailyMeals dailyMeals={dailyMeals}/>
                </Grid>
              </Grid>
            )
          }
        </UserContext.Consumer>
      </div>
    </UserProvider>
  )
};
