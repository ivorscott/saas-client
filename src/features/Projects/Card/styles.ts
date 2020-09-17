import { createStyles, Theme } from "@material-ui/core";

const styles = ({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    projectLink: {
      textDecoration: "none",
      marginRight: spacing() * 2,
      marginBottom: spacing() * 2,
      [breakpoints.down("xs")]: {
        marginRight: 0,
      },
    },
    project: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "20rem",
      height: "14rem",
      marginBottom: "12px",
      padding: spacing(),
      backgroundColor: palette.background.paper,
      color: palette.primary.main,
      transition: "height .5s ease-in-out",
      [breakpoints.down("xs")]: {
        width: "100%",
        height: "12rem",
      },
      "&:hover": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        transition: "all .5s cubic-bezier(.25,.8,.25,1)",
      },
    },
    title: {
      textTransform: "capitalize",
      flex: 1,
      display: "flex",
      marginTop: 0,
      justifyContent: "center",
      alignItems: "center",
      "& strong": {
        textAlign: "center",
      },
    },
  });

export { styles };
