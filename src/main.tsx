import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Auth0Provider } from "./services/AuthService";
import { StylesProvider } from "@material-ui/styles";
import { theme } from "./features/App/theme";
import { history } from "./features/App/history";
import { DevPie } from "./features/App/App";
import { ThemeProvider } from "@material-ui/styles";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Auth0Provider>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <DevPie />
          </StylesProvider>
        </ThemeProvider>
      </Router>
    </Auth0Provider>
  </QueryClientProvider>,
  document.getElementById("root")
);
