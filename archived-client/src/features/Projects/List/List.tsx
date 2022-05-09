import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { Card } from "../Card";
import styled from "styled-components";
import { Project } from "../../Project/types";

interface Props {
  isLoading: boolean;
  projects: Project[] | undefined;
}

const renderProjectCards = (projects: Project[]) => {
  const seq = projects.map((_, idx) => idx);
  return projects.map((project: Project, index: number) => (
    <Card key={project.id} project={project} seq={seq[index]} />
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
        <ListContainer>{renderProjectCards(projects)}</ListContainer>
      </Grid>
    );
  }
};

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: var(--p32);
`;
