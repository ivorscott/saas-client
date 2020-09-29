import { Theme, createStyles } from "@material-ui/core/styles";

const styles = ({ typography, palette, spacing }: Theme) =>
  createStyles({
    appFooter: {
      flex: 1,
      display: "flex",
      borderRadius: 0,
      padding: spacing() * 2,
      color: palette.common.white,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize * 1.2,
      backgroundColor: "#333",
      alignItems: "center",
    },
    copy: {
      marginRight: spacing() * 2,
    },
  });

export default styles;
