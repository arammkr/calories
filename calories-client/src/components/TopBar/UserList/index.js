import React from 'react';
import { List, ListItem, Divider, Typography, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {
  Link
} from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  searchResult: {
    position: "absolute",
  },
  userName: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
}));

export default props => {
  const {users = []} = props;
  const classes = useStyles();

  const handleLinkClick = () => {
    props.cleanUsers();
  }

  return (<div className={classes.searchResult}>
    <List className={classes.root}>
      {
        users.map((user, index) =>
          (
            <div key={user.id}>
              <ListItem alignItems="flex-start" component={Link} onClick={handleLinkClick} to={`/user/${user.id}`}>
                <ListItemText
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.userName}
                        color="textPrimary"
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </Typography>
                      @{user.nick}
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.userName}
                        color="textPrimary">
                        Calories per day - {user.caloriesPerDay}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {(users.length - 1) !== index && <Divider variant="inset" component="li" />}
            </div>
          )
        )
      }
    </List>
  </div>);
}
