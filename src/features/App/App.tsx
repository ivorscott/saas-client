import React from "react";
import Copyright from "@material-ui/icons/Copyright";
import { TopBar } from "./TopBar/TopBar";
import { SideBar } from "./SideBar";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes";
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
            <Routes />
          </PageContent>
        </Page>
      </App>
      <Footer>
        <Copyright /> <CopyrightText>Powered by DevPie</CopyrightText>
      </Footer>
      <ReactQueryDevtools position="bottom-left" />
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
  height: 100vh;
  overflow-x: scroll;
  padding: var(--p32) 5%;

  @media (max-width: 1400px) {
    padding: var(--p16);
  }
`;
const Footer = styled.div`
  position: relative;
  z-index: 3;
  padding: var(--p16);
  height: var(--p48);
  background: var(--blue6);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--white1);
`;
const CopyrightText = styled.div`
  padding-left: var(--p16);
`;
