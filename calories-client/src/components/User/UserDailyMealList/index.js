import React, { useCallback } from 'react';
import { Grid, Typography } from '@material-ui/core';
import MealCard from 'components/Meal/MealCard';
import MealDialog from 'components/Meal/MealDialog';
import { useUserContext } from 'context/User'
import dayjs from 'dayjs'

export default props => {
  const { dailyMeals } = props;

  if (!dailyMeals) {
    return null;
  }

  const userProvider = useUserContext();

  const onClose = useCallback(() => {
    userProvider.actions.toggleMealModal();
  }, [userProvider.actions]);

  return (
    <>
      <MealDialog
        isOpen={userProvider.state.openEditMeal}
        meal={userProvider.state.currentMeal}
        onClose={onClose}
        onSubmit={userProvider.actions.editMeal}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Meal list for {dayjs(userProvider.state.barDay).format('DD MMM YYYY')}</Typography>
        </Grid>
        {dailyMeals.map(meal => (
          <Grid key={meal.id} item xs={3}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}