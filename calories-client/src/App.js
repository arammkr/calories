import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { BrowserRouter } from 'react-router-dom';

import DayjsUtils from '@date-io/dayjs';

import Routing from 'routes';
import { AuthProvider } from './auth/AuthProvider';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

export default () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <BrowserRouter>
          <AuthProvider>
            <Routing />
          </AuthProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </div>
);
