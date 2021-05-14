import Add from "@material-ui/icons/Add";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Project } from "../../Project/types";
import { CreateTeamModal } from "../../Project/CreateTeamModal";
import { useProjects, useTeams, useCreateTeam } from "../../Project/hooks";
import { TeamProjects } from "./Projects";

export const Teams = () => {
  const projects = useProjects();
  const { data } = useTeams();
  const [createTeam] = useCreateTeam();
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const toggleCreateTeamModal = () => setTeamModalOpen(!isTeamModalOpen);

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
        {data.map((team) => (
          <li key={team.id}>
            <TeamRow>
              <aside>
                <Icon>{getInitials(team.name)}</Icon>
                <span>{team.name}</span>
              </aside>
            </TeamRow>
            {projects.data && (
              <TeamProjects teamId={team.id} projects={projects.data} />
            )}
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

function getInitials(teamName: string) {
  if (teamName.includes(" ")) {
    const names = teamName.split(" ");
    return names[0].substring(0, 1) + names[1].substring(0, 1);
  } else {
    return teamName.substring(0, 2);
  }
}

const Title = styled.h3`
  color: var(--gray3);
  font-family: ProximaNova-Light;
  font-size: var(--p16);
  font-weight: normal;
  padding: 0 var(--p24);
  margin-top: 0;
  margin-bottom: var(--p24);
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--p8);
  padding: 0 var(--p24);
  aside {
    display: flex;
    align-items: center;
  }

  span {
    font-family: ProximaNova-Light;
    text-transform: capitalize;
    font-size: var(--p12);
    color: var(--gray7);
  }
`;
const Icon = styled.div`
  height: var(--p24);
  width: var(--p24);
  background: var(--gray1);
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
  font-size: var(--p12);
  padding: 0 var(--p24);
  span {
    margin-left: var(--p12);
  }
`;
