import palette from "./palette";
import typography from "./typography";
import {
  ThemeOptions,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

const options: ThemeOptions = {
  typography,
  palette,
  spacing: 2,
};

export { options, createMuiTheme, MuiThemeProvider };
