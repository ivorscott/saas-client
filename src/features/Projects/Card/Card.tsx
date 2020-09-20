import React from "react";
import { WithStyles } from "@material-ui/core";
import { withStyles, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Project } from "../../Project";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { actions } from "../../Project";

const { setProject } = actions;

interface ParentProps {
  project: Project;
}

interface Props extends WithStyles<typeof styles> {
  project: Project;
  onClick: () => void;
}

const Component = withStyles(styles)(({ classes, project, onClick }: Props) => {
  return (
    <Link
      data-test="component-projects-card"
      onClick={onClick}
      className={classes.projectLink}
      key={project.id}
      to={`/manage/projects/${project.id}`}
    >
      <Paper className={classes.project}>
        <Typography className={classes.title} variant="h4">
          <strong>{project.name}</strong>
        </Typography>
      </Paper>
    </Link>
  );
});

const Card = ({ project }: ParentProps) => {
  const dispatch = useDispatch();
  const handleSetProject = () => dispatch(setProject(project));
  return <Component onClick={handleSetProject} project={project} />;
};

export { Card };
