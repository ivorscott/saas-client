import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints, palette }: Theme) =>
  createStyles({
    paperWidth: {
      [breakpoints.down("sm")]: {
        minWidth: "80%",
        minHeight: "60%",
      },
      [breakpoints.up("md")]: {
        minWidth: "30%",
        minHeight: "40%",
      },
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontWeight: 400,
      color: palette.primary.main,
    },
    content: {
      display: "flex",
      flexDirection: "column",
    },
  });

export { styles };
