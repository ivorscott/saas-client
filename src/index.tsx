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
import {
  styled,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";

import { View, Image, withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { useUser } from "./hooks/users";
import { formatPath } from "./helpers";
import { Loader } from "./components/Loader";
import { SideBar } from "./components/SideBar";
import Copyright from "@mui/icons-material/Copyright";
import { TopBar } from "./components/TopBar/TopBar";
import { PinnedProvider } from "./services/PinnedProvider";

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
  queryClient.invalidateQueries("projects").then();

  if (user) {
    const activeTenant = user.connections[tenantPath!];
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
  { hideSignUp: true, components }
);

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
