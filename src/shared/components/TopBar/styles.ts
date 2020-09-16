import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ palette, breakpoints }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      borderRadius: 0,
      padding: "0 1rem",
      transition: "background .3s ease-in-out",
    },
    brandWrapper: {
      [breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRright: "1rem",
      },
      [breakpoints.up("lg")]: {
        display: "none",
      },
    },
    brand: {
      marginTop: 0,
      color: palette.grey[900],
      fontWeight: "bold",
    },
    search: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 1,
      borderRadius: 0,
      position: "relative",
      [breakpoints.down("xs")]: {
        display: "none",
      },
    },
    searchField: {
      marginLeft: "1rem",
    },
    searchInputRoot: {
      fontSize: "1.7rem",
      color: palette.grey[800],
    },
    searchInputUnderline: {
      "&::before": {
        borderBottom: `1px solid ${palette.grey[300]}`,
      },
      "&::after": {
        borderColor: `${palette.grey[800]}`,
      },
      "&:hover::before": {
        borderBottom: `2px solid ${palette.grey[800]} !important`,
      },
    },
    searchInputProps: {
      [breakpoints.down("md")]: {
        color: palette.primary.light,
      },
    },
    menu: {
      display: "flex",
      alignItems: "center",
      margin: "10px 0",
      [breakpoints.down("sm")]: {
        paddingLeft: "1rem",
      },
    },
    iconColor: {
      color: palette.grey[800],
    },
    navIcon: {
      margin: "8px",
      color: palette.common.white,
    },
    navText: {
      color: palette.common.white,
    },
    navMenu: {
      background: palette.primary.main,
      borderRadius: 0,
      display: "none",
      [breakpoints.down("md")]: {
        display: "block",
      },
    },
    navLink: {
      textDecoration: "none",
    },
    navItem: {
      [breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    navItemWithPadding: {
      paddingLeft: "1rem",
    },
    nav: {
      padding: 0,
      margin: "10px 0",
      listStyleType: "none",
      display: "flex",
    },
  });

export { styles };
