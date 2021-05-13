import Add from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CreateTeamModal } from "../Project/CreateTeamModal";
import { useProjects, useTeams, useCreateTeam } from "../Project/hooks";
import { Project } from "../Project/types";

export const SideBar = () => {
  return (
    <StyledSideBar className="shade1">
      <Container>
        <div>
          <Link to="/manage/projects">
            <Logo alt="logo" src="/logo.png" />
          </Link>
        </div>
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
      </Container>
      <Teams />
    </StyledSideBar>
  );
};

const Teams = () => {
  const projects = useProjects();
  const { data } = useTeams();
  const [createTeam] = useCreateTeam();
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const toggleCreateTeamModal = () => setTeamModalOpen(!isTeamModalOpen);

  const TeamProjectMap = makeProjectTeamMap(projects.data);

  if (!data || data.length === 0) {
    return null;
  }

  const handleCreateTeam = () => {
    // createTeam();
  };

  return (
    <div>
      <Title>My Teams</Title>
      <ul>
        {data.map((team, idx) => (
          <li key={team.id}>
            <TeamRow>
              <aside>
                <Icon></Icon>
                <span>{team.name}</span>
              </aside>
            </TeamRow>
            <TeamProject>
              <Link to={`/manage/projects/${TeamProjectMap[`${team.id}`].id}`}>
                <span>{TeamProjectMap[`${team.id}`].name}</span>
              </Link>
            </TeamProject>
          </li>
        ))}
      </ul>
      <CreateTeam onClick={toggleCreateTeamModal}>
        <Add fontSize="small" /> <span>Create new team</span>
      </CreateTeam>
      <CreateTeamModal
        open={isTeamModalOpen}
        withProjects={true}
        onClose={toggleCreateTeamModal}
        onSubmit={handleCreateTeam}
      />
    </div>
  );
};

function makeProjectTeamMap(projects?: Project[]): {
  [index: string]: { name: string; id: string };
} {
  if (!projects || projects.length === 0) {
    return {};
  }
  return projects.reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr.teamId}`]: {
        id: curr.id,
        name: curr.name,
      },
    };
  }, {});
}

// function getInitials(teamName: string) {
//   if (teamName.includes(" ")) {
//     const names = teamName.split(" ");
//     return names[0].substring(0, 1) + names[1].substring(0, 1);
//   } else {
//     return teamName.substring(0, 2);
//   }
// }

// getInitials(team.name);

const StyledSideBar = styled.div`
  background: var(--white1);
  width: var(--p256);
  font-size: 18px;
  position: relative;
  ul {
    list-style: none;
    padding: 0;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`;
const PrimaryNav = styled.div`
  list-style: none;
  margin-bottom: 32px;
  li {
    padding-bottom: var(--p16);
  }
`;
const Container = styled.div`
  padding: var(--p16) var(--p24);
`;

const Logo = styled.img`
  height: var(--p32);
  margin-top: var(--p4);
  margin-bottom: var(--p64);
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

const Title = styled.h3`
  color: var(--gray3);
  font-family: ProximaNova-Light;

  font-size: var(--p16);
  font-weight: normal;
  padding: 0 var(--p24);
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--p16);
  padding: 0 var(--p24);
  aside {
    display: flex;
    align-items: center;
  }

  span {
    font-family: ProximaNova-Light;
    text-transform: capitalize;
    font-size: 14px;
    color: var(--gray7);
  }
`;
const Icon = styled.div`
  height: var(--p24);
  width: var(--p24);
  background: var(--blue1);
  border-radius: var(--p4);
  margin-right: var(--p8);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--p12);
  color: var(--gray7);
`;

const CreateTeam = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--gray7);
  font-size: 14px;
  padding: 0 var(--p24);
  span {
    margin-left: var(--p12);
  }
`;

const TeamProject = styled.div`
  padding: var(--p8) 0 var(--p12) calc(var(--p8) + var(--p48));
  font-size: 14px;
  margin: var(--p4) 0;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-family: ProximaNova-Light;
    color: var(--gray4);

    &:hover {
      color: var(--gray7);
    }
  }
  .selected {
    background: var(--blue1);
  }
`;
