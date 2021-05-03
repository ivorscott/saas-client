/*
spacing 

10 == 2.5rem == 40px
9  == 2.25rem == 36px
8  == 2rem == 32px
7  == 1.75rem == 28px
6  == 1.5rem == 24px
5  == 1.25rem == 18px
4  == 1rem == 16px
3  == 0.75rem == 12px
2  == 0.5rem == 8x
1  == 0.25rem == 4px
0  == 0 == 0px
*/

import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#334e68",
    },
    secondary: {
      main: "#f0f4f8",
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
});
