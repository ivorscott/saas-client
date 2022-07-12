import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Card } from "../Card";
import { styled } from "@mui/material/styles";
import { orderBy } from "helpers/helpers";
import { useProjects } from "hooks/project";
import { Project } from "types/project";

const renderProjectCards = (projects: Project[]) => {
  return orderBy("name", projects).map((project: Project) => (
    <Card key={project.id} project={project} />
  ));
};

export const List = () => {
  const { isLoading, data: projects } = useProjects();

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

const ListContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: var(--p32);
`;
