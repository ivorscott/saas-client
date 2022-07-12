import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  // allow configuration using `createTheme`
  interface PaletteOptions {
    disabled?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#334e68",
    },
    secondary: {
      main: "#f7c948",
    },
    disabled: {
      main: "#d9e2ec",
    },
  },
});
