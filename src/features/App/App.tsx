import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { SideBar } from "../../shared/components/Sidebar";
import { Layout } from "../../shared/components/Layout";
import { Footer } from "../../shared/components/Footer";
import { Modal } from "./Modal";
import { fbLoginWithRedirect, isFbTokenVerifed } from "../../services/Auth/AuthService";


export const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      minHeight: "100vh",
      flexDirection: "row",
      [breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      transition: "font-size .5s ease-in-out",
    },
  });

interface Props extends WithStyles<typeof styles> {}


const Component: React.FC<Props> = ({ classes }) => {

  const [isOpen, setOpen] = useState(false);

  useEffect(()=> {
      isFbTokenVerifed().then(isVerified => {
        setOpen(!isVerified)
      })
  })

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <SideBar />
        <Layout />
      </div>
      <Footer />
      <Modal open={isOpen} onContinue={fbLoginWithRedirect} />
    </div>
  );
};

export const App = withStyles(styles)(Component);