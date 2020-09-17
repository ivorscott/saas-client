import React, { useState, useEffect } from "react";
import {
  useDispatch,
  useSelector,
  // TypedUseSelectorHook
} from "react-redux";
import { List } from "./List";
import { fetchProjects, createProject } from "./reducer";
import { RootState } from "../../store";
// import { history } from "../../history";

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { projects, loading } = useSelector(
    (state: RootState) => state.projects
  );
  // console.log(projects);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleNewProject = async (name: string) => {
    await dispatch(createProject(name));
    // if (createProject.fulfilled.match(resultAction)) {
    //   toggleModal();
    //   history.push(`/manage/projects/${resultAction.payload.id}`);
    // }
  };

  return (
    <List
      isOpen={isOpen}
      loading={loading}
      onSubmit={handleNewProject}
      onToggle={toggleModal}
      projects={projects}
    />
  );
};

export { Projects };
