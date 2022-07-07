import React from "react";
import Copyright from "@mui/icons-material/Copyright";
import { TopBar } from "./TopBar/TopBar";
import { SideBar } from "./SideBar";
import { ReactQueryDevtools } from "react-query/devtools";
import AppRoutes from "./Routes";
import styled from "styled-components";
import "./App.css";

export const DevPie = () => {
  return (
    <>
      <App data-theme="light">
        <SideBar />
        <Page>
          <TopBar />
          <PageContent>
            <AppRoutes />
          </PageContent>
        </Page>
      </App>
      <Footer>
        <Copyright /> <CopyrightText>Powered by DevPie</CopyrightText>
      </Footer>
      <ReactQueryDevtools position="bottom-right" />
    </>
  );
};

const App = styled.div`
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
