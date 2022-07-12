import { styled } from "@mui/material/styles";
import { Layout } from "components/Layout";
import { MoreOptions } from "components/MoreOptions";
import { useProject } from "hooks/project";
import { useUsers } from "hooks/users";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "types/project";

import { ProjectSettings } from "./ProjectSettings";
import { ProjectUsers } from "./ProjectUsers";
import { SprintBoard } from "./SprintBoard";

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
  const { data: users } = useUsers();

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

  const classes = ["controls"];
  if (scrolled) {
    classes.push("scrolled");
  }

  return (
    <>
      <div className={classes.join(" ")}>
        <MoreOptions onClick={toggleSettings} />
        <ProjectUsers />
      </div>
      <ProjectSettings
        open={isSettingsOpen}
        project={props.project}
        users={users}
        onClose={toggleSettings}
      />
    </>
  );
};

const ProjectHeader = styled("header")`
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
