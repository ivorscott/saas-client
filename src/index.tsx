import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Loader } from "./components/Loader";
import { TopBar } from "./components/TopBar/TopBar";
import { SideBar } from "./components/SideBar";

import Copyright from "@mui/icons-material/Copyright";

import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/styled-engine";
import styled from "styled-components";
import "@aws-amplify/ui-react/styles.css";
import "./index.css";

import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({
  ...awsconfig,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
});

const Account = lazy(() => import("./features/Account"));
const NoMatch = lazy(() => import("./features/NoMatch"));
const Projects = lazy(() => import("./features/Projects"));
const SelectedProject = lazy(() => import("./features/Project"));

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);

const AppRoutes = () => (
  <Routes>
    <Route path="manage">
      <Route path="account" element={<Account />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:id" element={<SelectedProject />} />
    </Route>
    <Route path="/" element={<Navigate to={`/manage/projects`} />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);

const App = withAuthenticator(() => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Container>
            <SideBar />
            <Page>
              <TopBar />
              <PageContent>
                <React.Suspense fallback={<Loader />}>
                  <AppRoutes />
                </React.Suspense>
              </PageContent>
            </Page>
          </Container>
          <Footer>
            <Copyright /> <CopyrightText>Powered by DevPie</CopyrightText>
          </Footer>
          <ReactQueryDevtools position="bottom-right" />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
));

root.render(<App />);

const Container = styled.div`
  display: flex;
`;
const Page = styled.div`
  background: var(--white2);
  width: 100%;
`;
const PageContent = styled.div`
  overflow-x: scroll;
  min-height: 80vh;
  height: 100vh;
  padding: var(--p48) 5% var(--p96);

  @media (max-width: 1400px) {
    padding: var(--p16);
  }
`;
const Footer = styled.div`
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
const CopyrightText = styled.div`
  padding-left: var(--p16);
`;
