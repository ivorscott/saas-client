import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { Project } from "../../Project";
import { Card } from "../Card";

interface Props {
  isLoading: boolean;
  projects: Project[] | undefined;
}

const renderProjectCards = (projects: Project[]) => {
  return projects.map((project: Project, index: number) => (
    <Card key={"C-0" + index} project={project} />
  ));
};

export const List = ({ isLoading, projects }: Props) => {
  if (isLoading) {
    return (
      <Grid item={true} xs={12}>
        <div style={{ textAlign: "center", marginTop: "25vh" }}>
          <CircularProgress />
        </div>
      </Grid>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  } else {
    return (
      <Grid item={true} xs={12}>
        <div>{renderProjectCards(projects)}</div>
      </Grid>
    );
  }
};
