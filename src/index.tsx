import React from "react";
import ReactDOM from "react-dom";
import App from "./features/App";
import * as serviceWorker from "./serviceWorker";
import Auth0Provider from "./services/Auth/AuthService";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <ReduxProvider store={store}>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </ReduxProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
