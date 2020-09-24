import { createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    avatarModal: {
      width: 350,
    },
    contentWrapper: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        width: "100%",
      },
    },
    avatarEditor: {
      "& .konvajs-content": {
        position: "inherit",
      },
    },
    preview: {
      margin: "2rem 5rem 0",
    },
  });

export default styles;
