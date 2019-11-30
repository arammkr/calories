import React, { useState, useEffect, useCallback } from 'react';
import Layout from 'components/Layout';
import CrudTable from 'components/CrudTable';
import Fetch from 'utils/fetch';
import { Typography } from '@material-ui/core';

const COLUMNS = [
  { title: 'ID', field: 'id', editable: 'never' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Calories per day', field: 'caloriesPerDay', type: 'numeric' },
  { title: 'Email', field: 'email' },
  { title: 'Nick', field: 'nick' },
  {
    title: 'Role',
    field: 'role',
    lookup: { admin: 'Admin', user: 'User', manager: 'Manager' },
  },
  { title: 'Password', field: 'password' },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const getUsers = useCallback(async () => {
    const { users: data, total: count } = await Fetch.get({
      path: '/user/all',
      urlParams: { page, size },
    });
    setUsers(data);
    setTotal(count);
  }, [page, size]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onPageChange = (e, nextPage) => {
    setPage(nextPage + 1);
  };

  const takeDiff = (newData, oldData) =>
    Object.keys(newData)
      .filter(key => oldData[key] !== newData[key])
      .reduce((acc, key) => {
        acc[key] = newData[key];
        return acc;
      }, {});

  const handleError = e => {
    setError(e.message);
    if (e.payload) {
      setValidationError(e.payload);
    }

    throw new Error();
  };

  const onAdd = newData => {
    setError(null);
    setValidationError(null);

    return Fetch.post({ path: '/user', body: newData })
      .then(() => {
        setTotal(total + 1);
      })
      .catch(handleError);
  };

  const onUpdate = (newData, oldData) => {
    setError(null);
    setValidationError(null);
    const dataToUpdate = takeDiff(newData, oldData);
    return Fetch.put({ path: `/user/${oldData.id}`, body: dataToUpdate })
      .then(() => {
        const index = users.indexOf(oldData);
        setUsers([
          ...users.slice(0, index),
          newData,
          ...users.slice(index + 1),
        ]);
      })
      .catch(handleError);
  };

  const onDelete = user => {
    setError(null);
    setValidationError(null);

    return Fetch.delete({ path: `/user/${user.id}` })
      .then(() => {
        setTotal(total - 1);
        setUsers(users.filter(item => item.id !== user.id));
      })
      .catch(handleError);
  };

  return (
    <Layout>
      <div>
        {error && <Typography color="error">{error}</Typography>}
        {validationError &&
          Object.entries(validationError).map(([key, message]) => {
            return (
              <Typography key={key} color="error">
                {key} {message}
              </Typography>
            );
          })}
        <CrudTable
          page={page}
          total={total}
          size={size}
          data={users}
          title="Users"
          onAdd={onAdd}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onPageChange={onPageChange}
          columns={COLUMNS}
        />
      </div>
    </Layout>
  );
}

export default Users;
