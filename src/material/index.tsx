import { createTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import overrides from './overrides';
import colors from './colors';
import { ThemeColors } from '../types/style';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    colors: ThemeColors;
  }
  interface ThemeOptions {
    colors: ThemeColors;
  }
}

const theme = createTheme({
  colors,
  palette,
  typography,
  breakpoints,
  overrides,
  // props: {
  //   MuiButtonBase: {
  //     // The properties to apply
  //     disableRipple: true // No more ripple, on the whole application 💣!
  //   }
  // }
});

export default theme;
