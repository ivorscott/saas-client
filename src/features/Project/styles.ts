import { createStyles, Theme } from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
  createStyles({
    title: {
      color: "red",
      background: "pink",
      padding: spacing(),
    },
  });

export { styles };
