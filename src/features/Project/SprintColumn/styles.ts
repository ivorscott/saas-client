import { Theme, createStyles } from "@material-ui/core";

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: "0 0 24.5%",
      margin: "8px 2px",
      flexDirection: "column",
      [breakpoints.down("sm")]: {
        flex: "0 0 40%",
      },
      [breakpoints.down("xs")]: {
        flex: "0 0 75%",
      },
      "& section": {
        padding: spacing(),
      },
    },
    title: {
      padding: 8,
    },
    content: {
      display: "flex",
      flex: 1,
      overflow: "auto",
    },
    column: {
      flex: 1,
    },
    droppable: {
      height: "100%",
    },
  });

export { styles };
