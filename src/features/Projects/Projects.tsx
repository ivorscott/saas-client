import React, { useState } from "react";
import { List } from "./List";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../../services/APIService";
import { Project } from "../Project/types";
import { Grid, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Modal } from "./Modal";
import styled from "styled-components";
import { AxiosError } from "axios";
import { history } from "../../shared/history";

export const Projects = () => {
  const [isOpen, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Project[]>(
    "projects",
    async () => await client.get("/projects")
  );

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const { mutate } = useMutation<Project, AxiosError, string>(
    (name) => client.post("/projects", { name }),
    {
      onSuccess: (data, variable) => {
        queryClient.setQueryData(["projects", { name: variable }], data);
        history.push(`/manage/projects/${data.id}`);
      },
    }
  );

  return (
    <Grid container={true} spacing={10}>
      <Grid item={true} xs={12}>
        <Header>
          <div>
            <h1>Projects</h1>
          </div>
          <Fab onClick={toggleModal} color="secondary" aria-label="Add">
            <Add />
          </Fab>
        </Header>
        <List isLoading={isLoading} projects={data} />
        <Grid item={true} xs={12}>
          <Modal open={isOpen} onClose={toggleModal} onSubmit={mutate} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
