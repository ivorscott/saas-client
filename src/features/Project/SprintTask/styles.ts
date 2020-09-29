import { Theme, createStyles } from "@material-ui/core/styles";

const styles = ({ spacing }: Theme) =>
  createStyles({
    task: {
      background: "#f2f2f2",
      padding: "1rem",
      borderRadius: 4,
      border: "1px solid #e2e2e2",
      marginBottom: spacing(),
    },
  });

export { styles };
