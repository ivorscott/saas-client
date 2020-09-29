import React from "react";
import {
  CircularProgress,
  Divider,
  Fab,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { Modal } from "../Modal";
import { Project } from "../../Project";
import { styles } from "./styles";
import { Card } from "../Card";
import { loading, succeeded } from "../../../shared/types";

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  loading: loading;
  onToggle: () => void;
  onSubmit: (name: string) => void;
  projects: Project[];
}

const renderProjectCards = (projects: Project[]) => {
  return projects.map((project: Project, index: number) => (
    <Card key={"C-0" + index} project={project} />
  ));
};

const List = withStyles(styles)(
  ({ loading, projects, isOpen, onToggle, onSubmit, classes }: Props) => {
    return (
      <Grid data-test="component-projects" container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <header className={classes.header}>
            <div>
              <Typography variant="h1" gutterBottom={true}>
                Projects
              </Typography>

              <Typography variant="h2">Manage Projects</Typography>
            </div>
            <Fab
              onClick={onToggle}
              color="secondary"
              aria-label="Add"
              className={classes.fab}
            >
              <Add />
            </Fab>
          </header>
        </Grid>

        <Divider className={classes.divider} variant="fullWidth" />

        <Grid item={true} xs={12} />

        <Grid className={classes.projects} item={true} xs={12}>
          {loading !== succeeded ? (
            <div style={{ textAlign: "center", marginTop: "50vh" }}>
              <CircularProgress />
            </div>
          ) : Object.keys(projects).length ? (
            <div className={classes.cardList}>
              {renderProjectCards(projects)}
            </div>
          ) : null}
        </Grid>

        <Grid item={true} xs={12}>
          <Modal open={isOpen} onClose={onToggle} onSubmit={onSubmit} />
        </Grid>
      </Grid>
    );
  }
);

export { List };
