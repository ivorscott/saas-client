import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SprintBoard } from "./SprintBoard";
import { ProjectTeam } from "./ProjectTeam";
import { Memberships, Project, Team } from "./types";
import { ProjectSettings } from "./ProjectSettings";
import { useProject } from "../../hooks/project";
import { useTeam, useTeamMemberships } from "../../hooks/teams";
import { MoreOptions } from "../../components/MoreOptions";
import styled from "styled-components";
import { Layout } from "../../Layout";

export const SelectedProject = () => {
  const { id } = useParams();
  const selected = useProject(id);
  const navigate = useNavigate();

  if (selected.isError) {
    navigate("/manage/projects");
    return null;
  }

  if (!selected.data) {
    return null;
  } else {
    return (
      <Layout>
        <ProjectComponent project={selected.data} />
      </Layout>
    );
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
  }, []);

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
        team={team}
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
  position: relative;
  .name {
    text-transform: capitalize;
    font-family: ProximaNova-Light;
  }
  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    position: relative;
    z-index: 2;
    @media (max-width: 1400px) {
      position: fixed;
      right: var(--p16);
    }
  }
`;
