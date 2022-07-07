import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Project } from "../../features/Project/types";

interface LinkData {
  id: string;
  name: string;
}

interface TeamToProjectsMap {
  [index: string]: LinkData[];
}

interface TeamProjectsProps {
  projects: Project[];
  teamId: string;
}

export function TeamProjects(props: TeamProjectsProps) {
  const map = makeProjectTeamMap(props.projects);

  if (Object.keys(map).length === 0) {
    return null;
  }

  return (
    <>
      {(map[`${props.teamId}`] || []).map((link: LinkData) => (
        <StyledTeamProject key={link.id}>
          <Link to={`/manage/projects/${link.id}`}>
            <span>{link.name}</span>
          </Link>
        </StyledTeamProject>
      ))}
    </>
  );
}

function makeProjectTeamMap(projects?: Project[]): TeamToProjectsMap {
  if (!projects || projects.length === 0) {
    return {};
  }
  return projects.reduce((acc: any, curr) => {
    if (!curr.teamId) {
      return {
        ...acc,
      };
    }

    const currIdx = `${curr.teamId}`;
    const linkdata = { id: curr.id, name: curr.name };

    if (acc[currIdx]) {
      return {
        ...acc,
        [currIdx]: [...acc[currIdx], linkdata],
      };
    }

    return { ...acc, [currIdx]: [linkdata] };
  }, {});
}

const StyledTeamProject = styled.div`
  padding: var(--p4) 0 var(--p4) var(--p32);
  margin: var(--p4) 0;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-family: ProximaNova-Light;
    font-size: var(--p16);
    color: var(--gray4);

    &:hover {
      color: var(--gray7);
    }
  }
  .selected {
    background: var(--blue1);
  }
`;
