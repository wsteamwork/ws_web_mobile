import mainColor from '@/styles/constants/colors';
import fontWeight from '@/styles/constants/fontWeight';
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const options: ThemeOptions = {
  spacing: 8,
  props: {
    MuiButtonBase: {
      // disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  typography: {
    body1: {
      fontSize: 14
    },
    h1: {
      color: mainColor.titleText
    },
    subtitle1: {
      color: mainColor.blurText
    },
    fontWeightRegular: fontWeight.medium,

    fontFamily:
      '"Circular", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif !important;'
  },
  palette: {
    text: {
      primary: mainColor.titleText,
      secondary: mainColor.subTitleText,
      disabled: mainColor.blurText
    },
    primary: {
      main: mainColor.primary
    },
    secondary: {
      main: mainColor.backgroundWhite
    },
    error: {
      main: mainColor.error
    }
  }
};

const theme = createMuiTheme(options);

export default theme;
