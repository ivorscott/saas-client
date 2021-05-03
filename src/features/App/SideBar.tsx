import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSideBar = styled.div`
  background: var(--white1);
  width: var(--p257);
  position: relative;
  padding: var(--p14) var(--p34);
  ul {
    list-style: none;
    padding: 0;
  }
`;

const Logo = styled.img`
  height: var(--p34);
  margin-top: var(--p4);
  margin-bottom: var(--p64);
`;

const StyledLink = styled(Link)`
  font-size: var(--p18);
  text-decoration: none;
  cursor: pointer;
  color: var(--gray3);
  padding-top: var(--p8);
  &:hover {
    color: var(--gray5);
  }
`;

export const SideBar = () => {
  return (
    <StyledSideBar className="shade1">
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
    </StyledSideBar>
  );
};
