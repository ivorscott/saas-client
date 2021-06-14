import React from "react";
import { Link } from "react-router-dom";
import { Teams } from "./Teams";
import styled from "styled-components";

export const SideBar = () => {
  return (
    <StyledSideBar className="shade1">
      <Container>
        <div>
          <Link to="/manage/projects">
            <Logo alt="logo" src="/logo.png" />
          </Link>
        </div>
      </Container>
      <PrimaryNav>
        <li>
          <StyledLink to="/manage/projects">
            <div>Projects</div>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/manage/projects">
            <div>Estimates</div>
          </StyledLink>
        </li>
      </PrimaryNav>
      <Teams />
    </StyledSideBar>
  );
};

const StyledSideBar = styled.div`
  background: var(--white1);
  width: var(--p256);
  font-size: 18px;
  position: relative;
  ul {
    list-style: none;
    padding-bottom: var(--p24);
  }
  @media (max-width: 1400px) {
    display: none;
  }
`;
const PrimaryNav = styled.ul`
  list-style: none;
  padding: 0;
  li {
    padding: var(--p8) var(--p24);
  }
`;
const Container = styled.div`
  padding: var(--p16) var(--p24);
`;

const Logo = styled.img`
  height: var(--p32);
  margin-top: var(--p4);
  margin-bottom: var(--p32);
`;

const StyledLink = styled(Link)`
  font-size: var(--p16);
  text-decoration: none;
  cursor: pointer;
  color: var(--gray3);
  padding-top: var(--p8);
  &:hover {
    color: var(--gray5);
  }
`;
