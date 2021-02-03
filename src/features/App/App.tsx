import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import { SideBar } from "../../shared/components/Sidebar";
import { Layout } from "../../shared/components/Layout";
import { Footer } from "../../shared/components/Footer";
import { FreshModal } from "./FreshModal";

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

  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <SideBar />
        <Layout />
      </div>
      <Footer />
      <FreshModal />
    </div>
  );
};

export const App = withStyles(styles)(Component);