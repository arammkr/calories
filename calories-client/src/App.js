import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Router } from 'react-router-dom';
import history from 'utils/history';

import DayjsUtils from '@date-io/dayjs';

import Routing from 'routes';
import { AuthProvider } from './auth/AuthProvider';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

export default () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <AuthProvider>
          <Router history={history}>
            <Routing />
          </Router>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </div>
);
