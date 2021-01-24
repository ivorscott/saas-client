import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./services/Auth";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { options, createMuiTheme, MuiThemeProvider } from "./shared/theme";
import { store } from "./store";
import { history } from "./history";
import { SideBar } from "./shared/components/Sidebar";
import { Layout } from "./shared/components/Layout";
import { Footer } from "./shared/components/Footer";

const theme = createMuiTheme(options);

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

ReactDOM.render(
  <ReduxProvider store={store}>
    <Auth0Provider>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </Auth0Provider>
  </ReduxProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
