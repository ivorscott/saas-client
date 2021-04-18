import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, deleteProject, Project } from "./reducer";
import { history } from "../../history";
import { RootState } from "../../store";
import { SprintControls } from "./SprintControls";
import { SprintBoard } from "./SprintBoard";
import { Loading } from "../../shared/components/Loading";
import { InviteModal } from "./InviteModal";

interface Params {
  id: string;
}

interface Props {
  project: null | Project;
  onDelete: () => void;
}
const StyledMemberManagement = styled.div`
  width: 100%;
  padding-top: 15px;
`;

const StyledAdd = styled(Add)`
  width: 50px;
  height: 50px;
  color: #9ccc65;
`;

const StyledMembers = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px;
`;

const StyledAvatars = styled.div`
  background: #ececec;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  font-weight: bold;
  margin: 0 4px;
`;

const Component = ({ project, onDelete }: Props) => {
  const [isOpen, setOpen] = useState(false);
  if (!project) {
    return <Loading />;
  } else {
    return (
      <Grid data-test="component-project" container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <header>
            <div>
              <Typography variant="h1" gutterBottom={true}>
                <span>Project</span>
              </Typography>
            </div>
            <Typography variant="h2">
              Manage <span>{project.name}</span>
            </Typography>

            <SprintControls onDeleteProjectClick={onDelete} />
            <StyledMemberManagement>
              <StyledMembers>
                <StyledAdd onClick={() => setOpen(true)} />
                <StyledAvatars>AB</StyledAvatars>
                <StyledAvatars>EB</StyledAvatars>
                <StyledAvatars>AE</StyledAvatars>
              </StyledMembers>
            </StyledMemberManagement>
          </header>
        </Grid>
        <SprintBoard project={project} />
        <InviteModal isOpen={isOpen} onClose={() => setOpen(false)} />
      </Grid>
    );
  }
};

const SelectedProject: React.FC = () => {
  const params: Params = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);

  useEffect(() => {
    const fetch = async (params: Params) => {
      await dispatch(fetchProject(params.id));
    };
    fetch(params);
  }, [params, dispatch]);

  const handleDeleteProject = async () => {
    await dispatch(deleteProject(params.id));
    history.replace(`/manage/projects`);
  };

  return (
    <Component project={project.selected} onDelete={handleDeleteProject} />
  );
};

export { SelectedProject };
