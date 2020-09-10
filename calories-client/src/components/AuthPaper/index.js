import React from 'react';

import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gridWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2, 1),
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.gridWrapper}>
      <Paper className={classes.paper}>{children}</Paper>
    </div>
  );
};
