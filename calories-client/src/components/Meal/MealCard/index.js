import React, { useState } from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useUserContext } from 'context/User';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  }
}));

export default ({ meal }) => {
  const userProvider = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editMeal = meal => {
    userProvider.actions.toggleMealModal(meal);
    handleClose();
  }

  const deleteMeal = meal => {
    userProvider.actions.deleteMeal(meal);
  }

  const classes = useStyles();

  return (
    <Card className={classes.paper}>

      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={meal.name}
        subheader={`${meal.calories} Cal`}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => editMeal(meal)}>Edit</MenuItem>
        <MenuItem onClick={() => deleteMeal(meal)}>Delete</MenuItem>
      </Menu>
      <CardContent>
        fat: {meal.fat || 'N/A'} <br />
        carbs: {meal.carbs || 'N/A'} <br />
        protein: {meal.protein || 'N/A'} <br />
        time: {meal.time}
      </CardContent>
    </Card>
  )
}