
import dayjs from 'dayjs';

export const joiErrorParser = details => details.reduce((acc, item) => {
  acc[item.path[0]] = item.message;
  return acc;
}, {})

export const formatTime = time => {
  const [hour, minute] = time.split(':');
  return dayjs().set('hour', hour).set('minute', minute)
}

export const formatDate = date => {
  return dayjs(date);
}

export const getDate = date => {
  return date.format('YYYY-MM-DD');
}

export const getTime = date => {
  return date.format('HH:mm');
}