import React from "react";
import { CssBaseline } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Layout } from "./Layout";
import { SideBar } from "../../shared/components/Sidebar";
import { Footer } from "../../shared/components/Footer";
import { styles } from "./styles";

interface Props extends WithStyles<typeof styles> {}

const app: React.FC<Props> = ({ classes }) => {
  return (
    <div className="App">
      <CssBaseline />
      <div className={classes.root}>
        <SideBar />
        <Layout />
      </div>

      <Footer />
    </div>
  );
};

export const App = withStyles(styles)(app);
