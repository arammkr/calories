import React, { useState, useCallback } from 'react';
import lodashDebounce from 'lodash.debounce';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { InputBase } from '@material-ui/core'
import Fetch from 'utils/fetch';
import UserList from '../UserList';
import { useUpdate } from 'utils/hooks';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
}));
export default () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  useUpdate(() => {
    handleChange(searchText);
  }, [searchText]);

  const handleChange = useCallback(lodashDebounce(async (q = null) => {

    if (!q || q.length < 2) {
      setUsers([]);
      return;
    }
    const userList = await Fetch.get({ path: '/user/search', urlParams: { q } })
    setUsers(userList.users);
  }, 300), []);

  const handleInputChnage = useCallback(event => {
    setSearchText(event.target.value);
  }, []);

  const cleanUsers = useCallback(event => {
    setUsers([]);
  }, []);

  const classes = useStyles();
  
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        placeholder="Search user…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleInputChnage}
      />
      <UserList users={users} cleanUsers={cleanUsers}/>
    </div>
  );
}