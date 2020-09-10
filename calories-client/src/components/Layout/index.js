import React from 'react';
import TopBar from 'components/TopBar';
import { UserProvider } from 'context/User';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <UserProvider>
      <TopBar />
      <div className={classes.root}>{children}</div>
    </UserProvider>
  );
};

export default Layout;
