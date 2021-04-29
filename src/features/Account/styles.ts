import { createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {},
    profilePic: {
      marginTop: "2rem",
    },
    input: {
      display: "none",
    },
    avatarWrapper: {
      [breakpoints.down("xs")]: {
        display: "flex",
        justifyContent: "center",
      },
    },
    avatar: {
      width: "100%",
      verticalAlign: "top",
      borderRadius: "50%",
      "&:hover": {
        opacity: 0.7,
      },
    },
    overlay: {
      position: "absolute",
      borderRadius: "50%",
      width: "100%",
      top: 0,
      left: 0,
      transition: "all .5s",
      "&:hover": {
        background: "#000000",
      },
    },
   image: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#efefef",
      border: "6px solid #ffffff",
      borderRadius: "50%",
      boxShadow: `0 1px 3px rgba(0,0,0,0.12), 
                  0 1px 2px rgba(0,0,0,0.24);`,
      marginTop: "1rem",
      marginBottom: "1rem",
      transition: "all .5s",
      width: "120px",
      height: "120px",
      cursor: 'pointer'
    },
    uploadButton: {
      flex: 1,
      height: "100%"
    },
  });

export default styles;
