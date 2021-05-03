import React from "react";
import { IconButton, Grid } from "@material-ui/core";
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
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
`;

const Component = ({ project, team }: Props) => {
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
          <ProjectManagement>
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

const SelectedProject: React.FC = () => {
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

  const handleDeleteProject = async () => {
    await dispatch(deleteProject(params.id));
    history.replace(`/manage/projects`);
  };

  return <Component team={team} project={selected} />;
};

export { SelectedProject };
