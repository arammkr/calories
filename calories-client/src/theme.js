import { createMuiTheme } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';

export default createMuiTheme({
  palette: {
    primary: {
      ...green,
      main: green[500],
      contrastText: '#fff',
    },
  },
});
