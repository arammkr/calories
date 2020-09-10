import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Avatar,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
}));

export default ({ user }) => {
  const classes = useStyles();

  if (!user) return null;

  return (
    <Card className={classes.paper}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </Avatar>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={`@${user.nick}`}
      />
      <CardContent>
        <Typography variant="h3" component="p" align="right">
          {user.caloriesPerDay}
        </Typography>
        <Typography variant="subtitle1" align="right">
          calories per day
        </Typography>
      </CardContent>
    </Card>
  );
};
