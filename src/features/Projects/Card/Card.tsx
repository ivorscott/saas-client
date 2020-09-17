import React from "react";
import { WithStyles } from "@material-ui/core";
import { withStyles, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Project } from "..";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { actions } from "../reducer";

const { setProject } = actions;

interface Props extends WithStyles<typeof styles> {
  project: Project;
  onClick: () => void;
}

const jsx: React.FC<Props> = ({ classes, project, onClick }) => {
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
};

const Component = withStyles(styles)(jsx);

const Card: React.FC<{
  project: Project;
}> = ({ project }) => {
  const dispatch = useDispatch();

  const handleSetProject = () => {
    dispatch(setProject(project));
  };

  return <Component onClick={handleSetProject} project={project} />;
};

export { Card };
