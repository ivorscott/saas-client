import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { SideBar } from "../../shared/components/Sidebar";
import { Layout } from "../../shared/components/Layout";
import { Footer } from "../../shared/components/Footer";
import { Modal } from "./Modal";
import { history } from "../../history";
import environment from "../../env/local";

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
  const [isOpen, setOpen] = useState(true);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const next = () => {
    window.location.href = `https://auth.freshbooks.com/service/auth/oauth/authorize?client_id=${environment.freshbooks_client_id}&response_type=code&redirect_uri=https://localhost:3000`;
  };

  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <SideBar />
        <Layout />
      </div>
      <Footer />
      <Modal open={isOpen} onContinue={next} />
    </div>
  );
};

export const App = withStyles(styles)(Component);
