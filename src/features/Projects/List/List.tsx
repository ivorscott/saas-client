import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Card } from "../Card";
import { styled } from "@mui/material/styles";
import { Project } from "../../Project/types";
import { orderBy } from "../helpers";

interface Props {
  isLoading: boolean;
  projects: Project[] | undefined;
}

const renderProjectCards = (projects: Project[]) => {
  const seq = projects.map((_, idx) => idx);
  return orderBy(projects, "name").map((project: Project, index: number) => (
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

const ListContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: var(--p32);
`;
