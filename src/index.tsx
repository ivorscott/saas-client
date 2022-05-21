import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { AuthProvider } from "./services/AuthService";
import { StyledEngineProvider } from "@mui/styled-engine";
import { theme } from "./features/App/theme";
import { history } from "./features/App/history";
import { DevPie } from "./features/App/App";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <DevPie />
          </StyledEngineProvider>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
