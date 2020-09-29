import { createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    wrapperStyles: {
      maxWidth: "100%",
      maxHeight: "100%",
      flexDirection: "row",
      justifyContent: "center",
      display: "flex",
    },
    imageStyles: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "none",
    },
    xs: {
      width: "5%",
    },
    sm: {
      width: "15%",
    },
    md: {
      width: "25%",
    },
    lg: {
      width: "50%",
    },
    autoRotate270: {
      transform: `rotate(270deg)`,
    },
    autoRotate180: {
      transform: `rotate(180deg)`,
    },
    autoRotate90: {
      transform: `rotate(90deg)`,
    },
  });

export default styles;
