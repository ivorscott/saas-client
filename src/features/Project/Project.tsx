import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { history } from "../App/history";
import { SprintBoard } from "./SprintBoard";
import { ProjectTeam } from "./ProjectTeam";
import { Memberships, Params, Project, Team } from "./types";
import { ProjectSettings } from "./ProjectSettings";
import { useProject, useTeam, useTeamMemberships } from "../../hooks/project";
import styled from "styled-components";
import { MoreOptions } from "../../components/MoreOptions";

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
    return <ProjectComponent project={selected.data} />;
  }
};

const ProjectComponent = ({ project }: { project: Project }) => {
  return (
    <>
      <ProjectHeader>
        <div>
          <h1>
            Project/
            <span className="name">{project.name}</span>
          </h1>
          <span>{project.description}</span>
        </div>
        <Settings project={project} />
      </ProjectHeader>

      <SprintBoard project={project} />
    </>
  );
};

const Settings = (props: { project: Project }) => {
  let team: Team | undefined;
  let memberships: Memberships[] | undefined;

  const selectedTeam = useTeam(props.project.teamId);
  if (selectedTeam.isSuccess) {
    team = selectedTeam.data;
  }

  const members = useTeamMemberships(team?.id);
  if (members.isSuccess) {
    memberships = members.data;
  }

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [window]);

  let classes = ["controls"];
  if (scrolled) {
    classes.push("scrolled");
  }

  return (
    <>
      <div className={classes.join(" ")}>
        <MoreOptions onClick={toggleSettings} />
        <ProjectTeam project={props.project} />
      </div>
      <ProjectSettings
        open={isSettingsOpen}
        project={props.project}
        memberships={memberships}
        onClose={toggleSettings}
      />
    </>
  );
};

const ProjectHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: var(--p96);
  margin: 0 var(--p8);
  position: relative;
  .name {
    text-transform: capitalize;
    font-family: ProximaNova-Light;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    z-index: 2;
    @media (max-width: 1400px) {
      position: fixed;
      right: var(--p16);
    }
  }
`;
