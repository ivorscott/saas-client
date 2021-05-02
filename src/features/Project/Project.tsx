import React from "react";
import { Button, Grid } from "@material-ui/core";
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

interface Props {
  team: null | Team;
  project: null | Project;
}

const Component = ({ project, team }: Props) => {
  if (!project) {
    return <Loading />;
  } else {
    return (
      <Grid container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <header>
            <h1>
              <span>Project</span>
              <span>{project.name}</span>
            </h1>
            <Button>Settings</Button>;
            <ProjectTeam team={team} />
          </header>
        </Grid>
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
