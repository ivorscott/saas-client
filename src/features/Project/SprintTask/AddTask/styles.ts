import { createStyles, Theme } from "@material-ui/core";
const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: spacing(),
    },
    addTask: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
      },
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      "&:hover": {
        cursor: "pointer",
      },
      "& > div": {
        alignSelf: "center",
      },
      marginTop: spacing(),
    },
    save: {
      color: "#fff",
    },
  });

export { styles };
