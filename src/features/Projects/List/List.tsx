import React from "react";
import { CircularProgress, Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Modal } from "../Modal";
import { Project } from "../../Project";
import { Card } from "../Card";
import { loading, succeeded } from "../../../shared/types";

interface Props {
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

const List = ({ loading, projects, isOpen, onToggle, onSubmit }: Props) => {
  return (
    <Grid container={true} spacing={10}>
      <Grid item={true} xs={12}>
        <header>
          <div>
            <h1>Projects</h1>
          </div>
          <Fab onClick={onToggle} color="secondary" aria-label="Add">
            <Add />
          </Fab>
        </header>
      </Grid>

      <Grid item={true} xs={12}>
        {loading !== succeeded ? (
          <div style={{ textAlign: "center", marginTop: "50vh" }}>
            <CircularProgress />
          </div>
        ) : loading === succeeded && projects.length ? (
          <div>{renderProjectCards(projects)}</div>
        ) : null}
      </Grid>

      <Grid item={true} xs={12}>
        <Modal open={isOpen} onClose={onToggle} onSubmit={onSubmit} />
      </Grid>
    </Grid>
  );
};

export { List };
