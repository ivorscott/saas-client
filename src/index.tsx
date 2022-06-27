import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import { theme } from "./features/App/theme";
import { history } from "./features/App/history";
import { DevPie } from "./features/App/App";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({
  ...awsconfig,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
});

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);

const App = withAuthenticator(() => (
  <QueryClientProvider client={queryClient}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <DevPie />
        </StyledEngineProvider>
      </ThemeProvider>
    </Router>
  </QueryClientProvider>
));

root.render(<App />);
