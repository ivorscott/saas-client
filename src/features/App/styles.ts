import { createStyles, Theme } from "@material-ui/core/styles";
export const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      minHeight: "100vh",
      flexDirection: "row",
      [breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      transition: "font-size .5s ease-in-out",
    },
  });
