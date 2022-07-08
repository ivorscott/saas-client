import React from "react";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar/TopBar";
import Copyright from "@mui/icons-material/Copyright";
import styled from "styled-components";

export const Layout = (props: React.PropsWithChildren) => (
  <>
    <Container>
      <SideBar />
      <Page>
        <TopBar />
        <PageContent>{props.children}</PageContent>
      </Page>
    </Container>
    <Footer>
      <Copyright /> <CopyrightText>Powered by DevPie</CopyrightText>
    </Footer>
  </>
);

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
