import "./index.css";
import "@aws-amplify/ui-react/styles.css";

import { Image, View, withAuthenticator } from "@aws-amplify/ui-react";
import Copyright from "@mui/icons-material/Copyright";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {
  styled,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import { Loader } from "components/Loader";
import { SideBar } from "components/SideBar";
import { TopBar } from "components/TopBar/TopBar";
import { formatPath } from "helpers/helpers";
import { useUser } from "hooks/users";
import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { PinnedProvider } from "services/PinnedProvider";

import awsconfig from "./aws-exports";
import { EarlyAccessForm } from "./components/EarlyAccessForm";
import { features } from "./services/FeatureService";
import { theme } from "./theme";

features.applyOverrides();

Amplify.configure({
  ...awsconfig,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
});

const Account = lazy(() => import("features/Account"));
const NoMatch = lazy(() => import("features/NoMatch"));
const Profile = lazy(() => import("features/Profile"));
const Projects = lazy(() => import("features/Projects"));
const SelectedProject = lazy(() => import("features/Project"));

const queryClient = new QueryClient();

const TenantPath = () => {
  const user = useUser();
  const { tenantPath } = useParams();
  const defaultTenantPath = formatPath(user?.company);
  queryClient.invalidateQueries("projects").then();

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
      <Route path="/" element={<TenantPath />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="me" element={<Profile />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </React.Suspense>
);

const components = {
  Header() {
    return (
      <View textAlign="center">
        <Image width={200} alt="Amplify logo" src="/logo.png" />
      </View>
    );
  },
  Footer() {
    return (
      <View textAlign="center">
        {features.flags["F001"] && <EarlyAccessForm />}
      </View>
    );
  },
};

const App = withAuthenticator(
  () => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <>
              <Container>
                <PinnedProvider>
                  <SideBar />
                  <Page>
                    <TopBar />
                    <AppRoutes />
                  </Page>
                </PinnedProvider>
              </Container>
              <Footer>
                <Copyright /> <CopyrightText>Powered by DevPie</CopyrightText>
              </Footer>
            </>
            <ReactQueryDevtools position="bottom-right" />
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  ),
  { hideSignUp: features.flags["F001"], components }
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

const Container = styled("div")`
  display: flex;
`;
const Page = styled("div")`
  background: var(--white2);
  width: 100%;
`;
const Footer = styled("div")`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  padding: var(--p16);
  height: var(--p24);
  background: var(--blue6);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--white1);
`;
const CopyrightText = styled("div")`
  padding-left: var(--p16);
`;
