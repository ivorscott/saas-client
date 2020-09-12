import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      flex: "0 0 242px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#031B4D",
      [breakpoints.down("md")]: {
        display: "none",
      },
    },
    menu: {
      color: "#fff",
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    menuTop: {
      paddingTop: "18px",
      paddingLeft: "18px",
      paddingBottom: "39px",
    },
    menuCell: {
      flex: 1,
      display: "flex",
      padding: `.8rem 1.6rem`,
      alignItems: "center",
      justifyContent: "flex-start",
      "& a": {
        textDecoration: "none",
      },
    },
    menuChild: {
      paddingTop: "1rem",
      paddingLeft: "6rem",
    },
    divider: {
      height: "1px",
      flex: 1,
      opacity: 0.19,
      backgroundColor: "#FFF",
    },
    image: {
      width: "82px",
      marginBottom: "35px",
    },
    icon: {
      margin: "8px",
    },
    cellname: {
      color: "#fff",
      textTransform: "uppercase",
      textDecoration: "none",
    },
    account: {
      marginLeft: "8px",
    },
    app: {
      color: "#fff",
      fontSize: "1.4rem",
      fontFamily: "ProximaNova-Semibold",
    },
    release: {
      color: "#fff",
      fontSize: "1.4rem",
    },
  });

export { styles };
