import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/styled-engine";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";

import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { useUser } from "./hooks/users";
import { formatPath } from "./helpers";
import { Loader } from "./components/Loader";

Amplify.configure({
  ...awsconfig,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
});

const Account = lazy(() => import("./features/Account"));
const NoMatch = lazy(() => import("./features/NoMatch"));
const Profile = lazy(() => import("./features/Profile"));
const Projects = lazy(() => import("./features/Projects"));
const SelectedProject = lazy(() => import("./features/Project"));

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);

const TenantPath = () => {
  const user = useUser();
  const { tenantPath } = useParams();
  const defaultTenantPath = formatPath(user?.company);

  if (user && tenantPath) {
    const activeTenant = user.connections[tenantPath];
    if (!activeTenant) {
      return <Navigate to={`../${defaultTenantPath}/projects`} replace />;
    }
  }

  return <Outlet />;
};

const AppRoutes = () => (
  <React.Suspense fallback={<Loader />}>
    <Routes>
      <Route path=":tenantPath" element={<TenantPath />}>
        <Route path="account" element={<Account />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<SelectedProject />} />
      </Route>
      <Route path="me" element={<Profile />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </React.Suspense>
);

const App = withAuthenticator(() => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <AppRoutes />
          <ReactQueryDevtools position="bottom-right" />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
));

root.render(<App />);
