import React from "react";
import { TopBar } from "./TopBar";
import { Copyright } from "@material-ui/icons";
import styled from "styled-components";
import Routes from "./Routes";
import "./Fonts/Fonts.css";
import "./App.css";

import { Link } from "react-router-dom";

const App = styled.div`
  display: flex;
`;
const Page = styled.div`
  background: var(--white2);
  width: 100%;
`;
const PageContent = styled.div`
  padding: 30px 100px 0;
  height: 105vh;
  overflow-x: scroll;
`;
const Sidebar = styled.div`
  background: var(--white1);
  width: var(--p257);
  position: relative;
  padding: var(--p14) var(--p16);
  ul {
    list-style: none;
    padding: 0;
  }
`;
const Footer = styled.div`
  padding: var(--p16);
  background: var(--blue6);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--white1);
`;

const Logo = styled.img`
  height: var(--p34);
  margin-bottom: var(--p80);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: var(--gray3);
  &:hover {
    color: var(--gray5);
  }
`;

export const DevPie = () => {
  return (
    <App data-theme="light">
      <Sidebar className="shade1">
        <div>
          <Link to="/manage/projects">
            <Logo alt="logo" src="/logo.png" />
          </Link>
        </div>
        <ul>
          <li>
            <StyledLink to="/manage/projects">
              <span>Projects</span>
            </StyledLink>
          </li>
        </ul>
      </Sidebar>
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
