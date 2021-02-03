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
import { client as freshClient } from "../../services/FreshService";

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
      freshClient.isTokenVerifed().then(isVerified => {
        setOpen(!isVerified)
      })
  })

  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <SideBar />
        <Layout />
      </div>
      <Footer />
      <Modal open={isOpen} onContinue={freshClient.loginWithRedirect} />
    </div>
  );
};

export const App = withStyles(styles)(Component);