import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

// setting the theme of my app (colors & fonts)
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: grey,
    error: {
      main: '#F44336'
    },
    background: {
      default: '#141414'
    }
  },
  typography: {
    fontFamily: 'Abhaya Libre',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});
export default theme;
