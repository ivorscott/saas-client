import React from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Project } from "../../Project";
import { useDispatch } from "react-redux";
import { actions } from "../../Project";

const { setProject } = actions;

interface ParentProps {
  project: Project;
}

interface Props {
  project: Project;
  onClick: () => void;
}

const Component = ({ project, onClick }: Props) => {
  return (
    <Link
      onClick={onClick}
      key={project.id}
      to={`/manage/projects/${project.id}`}
    >
      <Paper>
        <p>
          <strong>{project.name}</strong>
        </p>
      </Paper>
    </Link>
  );
};

const Card = ({ project }: ParentProps) => {
  const dispatch = useDispatch();
  const handleSetProject = () => dispatch(setProject(project));
  return <Component onClick={handleSetProject} project={project} />;
};

export { Card };
