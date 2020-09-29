import { createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    menu: {
      display: "flex",
      flexDirection: "row",
      listStyle: "none",
      flex: 1,
      padding: 0,
      margin: 0,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    sprint: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
    },
    button: {
      fontFamily: "ProximaNova-Regular",
      fontSize: "1.2rem",
      marginRight: "1.8rem",
    },
    icon: {
      color: "#9B9B9B",
      marginLeft: "1rem",
    },
    pink: {
      backgroundColor: "#FF929F",
    },
    bold: {
      fontFamily: "ProximaNova-Semibold",
    },
    white: {
      color: "#FFF",
    },
  });

export default styles;
