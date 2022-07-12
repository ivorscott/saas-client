import React from "react";
import { Link } from "react-router-dom";
import { Teams } from "./Teams";
import { styled } from "@mui/material/styles";
import { useTenantMap } from "../../hooks/users";
import { assignColor, findPinnedByPath, getOrgs, orderBy } from "../../helpers";
import { usePinned } from "../../services/PinnedProvider";

const RenderOrganizations = () => {
  const { isLoading, isError, data: tmap } = useTenantMap();
  const { pinned } = usePinned();

  if (isLoading || isError || !tmap) {
    return <div></div>;
  }

  const orgs = orderBy("company", getOrgs(tmap)).map(assignColor);

  return (
    <>
      {orgs.map(({ name, path, color }, index) => {
        const pinnedProjects = findPinnedByPath(pinned, path);
        return (
          <li key={index}>
            <OrgLink to={`/${path}/projects`}>
              <aside className={color}></aside>
              <p>{name}</p>
            </OrgLink>

            {(pinnedProjects || []).map((project, index) => (
              <ProjectLink
                key={index}
                to={`/${path}/projects/${project.projectId}`}
              >
                {project.name}
              </ProjectLink>
            ))}
          </li>
        );
      })}
    </>
  );
};

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
        <li className="bottom">
          <StyledLink to="/projects">
            <div>Projects</div>
          </StyledLink>
        </li>
        <RenderOrganizations />
      </PrimaryNav>
      <Teams />
    </StyledSideBar>
  );
};

const StyledSideBar = styled("div")`
  background: var(--white1);
  height: calc(100vh + 48px);
  width: var(--p300);
  font-size: var(--p18);
  position: relative;
  ul {
    list-style: none;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`;

const OrgLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ProximaNova-Semibold;
  font-size: var(--p16);
  color: var(--gray7);
  text-decoration: none;

  aside {
    height: 30px;
    width: 30px;
    margin-right: var(--p14);
  }
`;

const ProjectLink = styled(Link)`
  margin-left: 44px;
  margin-top: 14px;
  display: block;
  text-decoration: none;
  color: var(--gray7);
  font-family: ProximaNova-Light;
`;

const PrimaryNav = styled("ul")`
  list-style: none;
  padding: 0;
  li {
    padding: var(--p12) var(--p24);
  }
  li.bottom {
    margin-bottom: 52px;
  }
  p {
    margin: 0;
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
  color: var(--gray6);
  font-family: ProximaNova-Semibold;
  font-size: var(--p20);
  padding-top: var(--p8);
  &:hover {
    color: var(--gray5);
  }
`;
