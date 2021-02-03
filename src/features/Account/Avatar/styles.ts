import { createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    avatarModal: {
      width: 400,
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
      cursor: 'pointer'
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
