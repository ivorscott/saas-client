import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints }: Theme) =>
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
      [breakpoints.down("sm")]: {
        overflowX: "scroll",
      },
    },
  });

export { styles };
