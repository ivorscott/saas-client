import { Theme, createStyles } from "@material-ui/core/styles";

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
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
  });

export { styles };
