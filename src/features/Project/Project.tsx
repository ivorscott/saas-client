import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { useParams } from "react-router-dom";
import { history } from "../../shared/history";
import { SprintBoard } from "./SprintBoard";
import { Loading } from "../../shared/components/Loading";
import { ProjectTeam } from "./ProjectTeam";
import { Memberships, Params, Project, Team } from "./types";
import { ProjectSettings } from "./ProjectSettings";
import { useProject, useTeam, useTeamMemberships } from "./hooks";
import styled from "styled-components";

export const SelectedProject = () => {
  const params: Params = useParams();

  const selected = useProject(params.id);

  if (selected.isError) {
    history.push("/manage/projects");
    return;
  }

  // const handleDeleteProject = async () => {
  //   await dispatch(deleteProject(params.id));
  //   history.replace(`/manage/projects`);
  // };

  // Do mutation
  // export const deleteProject = async (id: string) => {
  //     return await client.delete(`/projects/${id}`);
  //   }

  if (!selected.data) {
    return null;
  } else {
    return <Component project={selected.data} />;
  }
};

const Component = ({ project }: { project: Project }) => {
  let team: Team | undefined;
  let memberships: Memberships[] | undefined;

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const selectedTeam = useTeam(project.teamId);
  if (selectedTeam.isSuccess) {
    team = selectedTeam.data;
  }

  const members = useTeamMemberships(team?.id);
  if (members.isSuccess) {
    memberships = members.data;
  }

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  if (!project) {
    return <Loading />;
  } else {
    return (
      <>
        <Header>
          <div>
            <h1>
              Project/
              <ProjectName>{project.name}</ProjectName>
            </h1>
            <span>{project.description}</span>
          </div>
          <ProjectControls>
            <div>
              <StyledIconButton size="small" onClick={toggleSettings}>
                <MoreHoriz />
              </StyledIconButton>
            </div>
            <TeamControls>
              <ProjectTeam project={project} />
            </TeamControls>
          </ProjectControls>
        </Header>
        <SprintBoard project={project} />
        <ProjectSettings
          open={isSettingsOpen}
          project={project}
          memberships={memberships}
          onClose={toggleSettings}
        />
      </>
    );
  }
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: var(--p96);
  margin: 0 var(--p8);
  position: relative;
`;
const ProjectName = styled.span`
  text-transform: capitalize;
  font-family: ProximaNova-Light;
`;
const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin: var(--p16) 0;
`;

const ProjectControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 1400px) {
    position: fixed;
    right: var(--p16);
  }
`;
const TeamControls = styled.div``;
