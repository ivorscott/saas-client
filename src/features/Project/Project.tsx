import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, deleteProject, Project } from "./reducer";
import { history } from "../../history";
import { RootState } from "../../store";
import { SprintControls } from "./SprintControls";
import { SprintBoard } from "./SprintBoard";
import { Loading } from "../../shared/components/Loading";

interface Params {
  id: string;
}

interface Props {
  project: null | Project;
  onDelete: () => void;
}

const Component = ({ project, onDelete }: Props) => {
  if (!project) {
    return <Loading />;
  } else {
    return (
      <Grid data-test="component-project" container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <header>
            <div>
              <Typography variant="h1" gutterBottom={true}>
                <span>Project</span>
              </Typography>
            </div>
            <Typography variant="h2">
              Manage <span>{project.name}</span>
            </Typography>

            <SprintControls onDeleteProjectClick={onDelete} />
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
  const project = useSelector((state: RootState) => state.project);

  useEffect(() => {
    const fetch = async (params: Params) => {
      await dispatch(fetchProject(params.id));
    };
    fetch(params);
  }, [params, dispatch]);

  const handleDeleteProject = async () => {
    await dispatch(deleteProject(params.id));
    history.replace(`/manage/projects`);
  };

  return (
    <Component project={project.selected} onDelete={handleDeleteProject} />
  );
};

export { SelectedProject };
