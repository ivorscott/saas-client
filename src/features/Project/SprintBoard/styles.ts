import { createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    board: {
      padding: "12px 8px !important",
    },
    root: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      height: "70vh",
      maxWidth: "100%",
      overflow: "scroll",
      overflowX: "scroll",
    },
  });

export { styles };
