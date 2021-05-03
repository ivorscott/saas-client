import React, { useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../shared/store";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../Project/reducer";
import { fetchProjects } from "./reducer";
import { history } from "../../shared/history";
import { List } from "./List";

const Projects: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => await dispatch(fetchProjects());
    fetch();
  }, [dispatch]);

  const { entities, loading } = useSelector(
    (state: RootState) => state.projects
  );

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleNewProject = async (name: string) => {
    const resultAction = await dispatch(createProject(name));

    if (createProject.fulfilled.match(resultAction)) {
      toggleModal();
      const { id } = unwrapResult(resultAction);
      history.push(`/manage/projects/${id}`);
    }
  };

  return (
    <List
      isOpen={isOpen}
      loading={loading}
      onSubmit={handleNewProject}
      onToggle={toggleModal}
      projects={entities}
    />
  );
};

export { Projects };
