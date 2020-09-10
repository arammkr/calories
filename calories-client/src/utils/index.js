import dayjs from 'dayjs';
import roles from '../constants/roles';

export const joiErrorParser = details =>
  details.reduce((acc, item) => {
    acc[item.path[0]] = item.message;
    return acc;
  }, {});

export const formatTime = time => {
  const [hour, minute] = time.split(':');
  return dayjs()
    .set('hour', hour)
    .set('minute', minute);
};

export const formatDate = date => {
  return dayjs(date);
};

export const getDate = date => {
  return date.format('YYYY-MM-DD');
};

export const getTime = date => {
  return date.format('HH:mm');
};

export const modifyAvgNutrition = response => {
  const map = {
    avgCarbs: 'Averate used carbs',
    avgFat: 'Averate used fat',
    avgProtein: 'Averate used protein',
  };
  return Object.keys(response.data[0]).map(key => ({
    id: key,
    label: map[key],
    value: Number(response.data[0][key]),
    color: 'hsl(354, 70%, 50%)',
  }));
};

export const modifyUserMeals = (response, caloriesPerDay) => {
  return (
    response &&
    response.data &&
    response.data.map(i => ({
      ...i,
      sum: Number(i.sum),
      color: i.sum > caloriesPerDay ? '#f50057' : '#16c763',
    }))
  );
};

export const hasAccessToUsers = (isLogedIn, auth) => {
  const role = (auth && auth.role && auth.role.role) || null;
  if (!isLogedIn) {
    return false;
  }

  return [roles.ADMIN, roles.MANAGER].includes(role);
};

export const canEditMeals = (isMe, role) => {
  return isMe || role === roles.ADMIN;
};
