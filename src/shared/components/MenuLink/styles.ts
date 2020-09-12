import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    round: {
      borderRadius: "4px",
      marginLeft: ".5rem",
    },
    menuLink: {
      color: theme.palette.grey[700],
      textDecoration: "none",
      "&:visited": {
        color: theme.palette.grey[200],
      },
    },
  });

export { styles };
