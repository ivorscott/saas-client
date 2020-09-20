import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    filled: {
      color: theme.palette.secondary.main,
    },
  });

export { styles };
