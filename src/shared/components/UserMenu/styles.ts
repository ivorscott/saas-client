import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ palette }: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    identity: {
      margin: "8px 0px 0px 18px",
    },
    dropdownMenu: {
      zIndex: 1,
      left: "-.5rem !important",
      width: "250px",
    },
    name: {
      textTransform: "lowercase",
      color: `${palette.grey[800]}`,
      marginLeft: 9,
    },
    item: {
      padding: 12,
    },
    plainText: {
      color: "#000000de",
      textDecoration: "none",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    profilePic: {
      width: "33px",
      height: "33px",
      borderRadius: "50px !important",
      background: "#bbb",
    },
    profilePicLarge: {
      width: "64px",
      height: "64px",
      borderRadius: "50px",
      background: "#bbb",
    },
  });

export { styles };
