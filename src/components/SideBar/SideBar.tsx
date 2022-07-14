import { styled } from "@mui/material/styles";
import {
  assignColor,
  findPinnedByPath,
  getOrgs,
  orderBy,
} from "helpers/helpers";
import { useTenantMap } from "hooks/users";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePinned } from "services/PinnedProvider";

const RenderOrganizations = () => {
  const { isLoading, isError, data: tmap } = useTenantMap();
  const { pinned } = usePinned();
  const navigate = useNavigate();

  if (isLoading || isError || !tmap) {
    return <div></div>;
  }

  const goToProject = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string,
    id: string
  ) => {
    e.preventDefault();
    navigate(`/${path}/projects/${id}`);
    console.log(path, id);
  };
  const orgs = orderBy("company", getOrgs(tmap)).map(assignColor);
  const isActive = (path: string) =>
    window.location.pathname.split("/")[1] === path;

  return (
    <StyledOrganisations>
      {orgs.map(({ name, path, color }, index) => {
        const pinnedProjects = findPinnedByPath(pinned, path);

        return (
          <li className={`org ${isActive(path) && "active"}`} key={index}>
            <OrgLink to={`/${path}/projects`}>
              <OrgName>
                <aside className={color}></aside>
                <p>{name}</p>
              </OrgName>
              {(pinnedProjects || []).map((project, index) => (
                <ProjectLink
                  key={index}
                  onClick={(e) => goToProject(e, path, project.projectId)}
                >
                  {project.name}
                </ProjectLink>
              ))}
            </OrgLink>
          </li>
        );
      })}
    </StyledOrganisations>
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
      </PrimaryNav>
      <RenderOrganizations />
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
const StyledOrganisations = styled("ul")`
  padding: 0;
  li.org.active {
    background: var(--blue1);
  }
`;
const OrgLink = styled(Link)`
  font-family: ProximaNova-Semibold;
  font-size: var(--p16);
  color: var(--gray7);
  text-decoration: none;
  padding: var(--p12) var(--p24);
  display: block;
  aside {
    height: 30px;
    width: 30px;
    border-radius: 4px;
    margin-right: var(--p14);
  }
`;

const OrgName = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProjectLink = styled("div")`
  margin-left: 44px;
  margin-top: 14px;
  display: inline;
  text-decoration: none;
  color: var(--gray7);
  font-family: ProximaNova-Light;
  &:hover {
    color: var(--blue6);
  }
`;

const PrimaryNav = styled("ul")`
  list-style: none;
  padding: 0;
  li {
    padding: var(--p12) var(--p24);
  }
  li.bottom {
    margin-bottom: var(--p24);
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
