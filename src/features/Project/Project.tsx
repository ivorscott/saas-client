import React from "react";
import { IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, deleteProject, fetchTeam } from "./reducer";
import { history } from "../../shared/history";
import { RootState } from "../../shared/store";
import { SprintBoard } from "./SprintBoard";
import { Loading } from "../../shared/components/Loading";
import { ProjectTeam } from "./ProjectTeam";
import { Params, Project, Team } from "./types";
import styled from "styled-components";

interface Props {
  team: null | Team;
  project: null | Project;
}

const Component = ({ project, team }: Props) => {
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
  });
  let navbarClasses = ["proj-management"];

  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  if (!project) {
    return <Loading />;
  } else {
    return (
      <>
        <Header>
          <h1>
            Project/
            <ProjectName>{project.name}</ProjectName>
          </h1>
          <ProjectManagement className={navbarClasses.join(" ")}>
            <IconButton>
              <MoreHoriz />
            </IconButton>
            <ProjectTeam team={team} />
          </ProjectManagement>
        </Header>
        <SprintBoard project={project} />
      </>
    );
  }
};

export const SelectedProject: React.FC = () => {
  const params: Params = useParams();
  const dispatch = useDispatch();

  const { team, selected } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    const fetch = async ({ id }: Params) => await dispatch(fetchProject(id));
    fetch(params);
  }, [params, dispatch]);

  useEffect(() => {
    const fetch = async (teamId: string) => await dispatch(fetchTeam(teamId));
    selected?.teamId && fetch(selected.teamId);
  }, [dispatch, selected]);

  // const handleDeleteProject = async () => {
  //   await dispatch(deleteProject(params.id));
  //   history.replace(`/manage/projects`);
  // };

  return <Component team={team} project={selected} />;
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: var(--p100);
`;
const ProjectName = styled.span`
  text-transform: capitalize;
  font-family: ProximaNova-Light;
`;

const ProjectManagement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  z-index: 1;

  @media only screen and (max-width: 1400px) {
    position: fixed;
    right: var(--p16);
  }
`;
