import { createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const styles = () =>
  createStyles({
    confirmDialog: {
      display: "flex",
      flex: 1,
      justifyContent: "flex-end",
      marginTop: 20,
    },
    confirmAction: {
      color: red[300],
      textDecoration: "underline",
      cursor: "pointer",
      paddingLeft: 20,
    },
  });

export { styles };
