import React from "react";
import { Link } from "react-router-dom";
import { Teams } from "./Teams";
import { styled } from "@mui/material/styles";

export const SideBar = () => {
  return (
    <StyledSideBar className="shade1">
      <Container>
        <div>
          <Link to="/projects">
            <Logo alt="logo" src="/logo.png" />
          </Link>
        </div>
      </Container>
      <PrimaryNav>
        <li>
          <StyledLink to="/projects">
            <div>Projects</div>
          </StyledLink>
        </li>
      </PrimaryNav>
      <Teams />
    </StyledSideBar>
  );
};

const StyledSideBar = styled("div")`
  background: var(--white1);
  height: calc(100vh + 48px);
  width: var(--p256);
  font-size: var(--p18);
  position: relative;
  ul {
    list-style: none;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`;
const PrimaryNav = styled("ul")`
  list-style: none;
  padding: 0;
  li {
    padding: var(--p12) var(--p24);
  }
`;
const Container = styled("div")`
  padding: var(--p16) var(--p24);
`;

const Logo = styled("img")`
  height: var(--p48);
  margin-top: var(--p2);
  margin-bottom: var(--p32);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: var(--gray3);
  padding-top: var(--p8);
  &:hover {
    color: var(--gray5);
  }
`;
