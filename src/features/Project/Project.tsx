import React from "react";
import { IconButton, Grid } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, deleteProject, fetchTeam } from "./reducer";
import { history } from "../../history";
import { RootState } from "../../store";
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
  padding-top: var(--p44);
  justify-content: space-between;
`;
const ProjectName = styled.span`
  text-transform: capitalize;
  font-family: ProximaNova-Light;
`;

const StyledGrid = styled(Grid)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`;

const Component = ({ project, team }: Props) => {
  if (!project) {
    return <Loading />;
  } else {
    return (
      <Grid container={true} spacing={10}>
        <StyledGrid item={true} xs={12}>
          <Header>
            <h1>
              Project/
              <ProjectName>{project.name}</ProjectName>
            </h1>
            <div>
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </div>
          </Header>
          <div>
            <ProjectTeam team={team} />
          </div>
        </StyledGrid>
        <SprintBoard project={project} />
      </Grid>
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
