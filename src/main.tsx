import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Auth0Provider } from "./services/AuthService";
import { StylesProvider } from "@material-ui/styles";
import { store } from "./store";
import { history } from "./history";
import { DevPie } from "./features/App";

ReactDOM.render(
  <ReduxProvider store={store}>
    <Auth0Provider>
      <Router history={history}>
        <StylesProvider injectFirst>
          <DevPie />
        </StylesProvider>
      </Router>
    </Auth0Provider>
  </ReduxProvider>,
  document.getElementById("root")
);
