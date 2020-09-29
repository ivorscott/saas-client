import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    header: {
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
    },
    projects: {
      display: "flex",
      flex: 1,
      flexWrap: "wrap",
      justifyContent: "flex-start",
    },
    divider: {
      marginBottom: spacing() * 2,
    },
    fab: {
      color: "#fff",
    },
    cardList: {
      display: "flex",
      [breakpoints.down("xs")]: {
        flexDirection: "column",
        flex: 1,
      },
    },
  });

export { styles };
