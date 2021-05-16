import Add from "@material-ui/icons/Add";
import React, { useState } from "react";
import styled from "styled-components";
import { CreateTeamModal } from "../../Project/CreateTeamModal";
import { useProjects } from "../../../hooks/project";
import { useTeams, useCreateTeam } from "../../../hooks/teams";
import { TeamProjects } from "./Projects";
import { getTeamInitials } from "../helpers";
import { Team } from "../../Project/types";
import { AssignProjectModal } from "../../Project/AssignProjectModal";

export const Teams = () => {
  const projects = useProjects();
  const { data } = useTeams();
  const [createTeam] = useCreateTeam();
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [isAssignProjectModalOpen, setAssignProjectModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const toggleCreateTeamModal = () => setTeamModalOpen(!isTeamModalOpen);
  const toggleAssignProjectModal = () =>
    setAssignProjectModalOpen(!isAssignProjectModalOpen);

  const handleAssignProject = (teamName: string) => {
    setSelectedTeam(teamName);
    toggleAssignProjectModal();
  };

  if (!data || data.length === 0) {
    return null;
  }

  const handleCreateTeam = () => {
    // createTeam();
  };

  return (
    <div>
      <Title>Teams</Title>
      <ul>
        {data.map((team: Team) => (
          <li key={team.id}>
            <TeamRow>
              <aside>
                <div className="team">
                  <Icon>{getTeamInitials(team.name)}</Icon>
                  <span>{team.name}</span>
                </div>
                <AssignProject
                  onClick={(e) => handleAssignProject(team.name)}
                  fontSize="small"
                />
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
        onClose={toggleCreateTeamModal}
        onSubmit={handleCreateTeam}
      />
      <AssignProjectModal
        open={isAssignProjectModalOpen}
        teamName={selectedTeam}
        onClose={toggleAssignProjectModal}
        onSubmit={handleAssignProject}
      />
    </div>
  );
};

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
  margin-top: var(--p16);
  padding: 0 var(--p24);
  aside {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .team {
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

const AssignProject = styled(Add)`
  cursor: pointer;
  color: var(--gray7);
`;
