import React from "react";
import { TopBar } from "./TopBar";
import { Copyright } from "@material-ui/icons";
import styled from "styled-components";
import Routes from "./Routes";
import "./Fonts/Fonts.css";
import "./App.css";

import { SideBar } from "./SideBar";

const App = styled.div`
  display: flex;
`;
const Page = styled.div`
  background: var(--white2);
  width: 100%;
`;
const PageContent = styled.div`
  padding: var(--p86);
  height: 100vh;
  overflow-x: scroll;
`;

const Footer = styled.div`
  padding: var(--p16);
  background: var(--blue6);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--white1);
`;

export const DevPie = () => {
  return (
    <App data-theme="light">
      <SideBar />
      <Page>
        <TopBar />

        <PageContent>
          <Routes />
        </PageContent>

        <Footer>
          <Copyright className="mr8" /> <span>Powered by DevPie</span>
        </Footer>
      </Page>
    </App>
  );
};
