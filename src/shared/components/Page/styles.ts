import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: "0 0 auto",
      flexDirection: "row",
      justifyContent: "center",
      padding: "4rem",
      transition: "padding .5s ease-in-out",
      [breakpoints.down("md")]: {
        padding: "2rem 1rem",
      },
    },
  });

export { styles };
