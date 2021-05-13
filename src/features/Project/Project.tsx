import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { useParams } from "react-router-dom";
import { history } from "../../shared/history";
import { SprintBoard } from "./SprintBoard";
import { Loading } from "../../shared/components/Loading";
import { ProjectTeam } from "./ProjectTeam";
import { Memberships, Params, Project, Team } from "./types";
import {
  useProject,
  useTeam,
  useCreateTeam,
  useCreateInvite,
  useTeamMemberships,
} from "./hooks";
import { CreateTeamModal } from "./CreateTeamModal";
import { InviteModal } from "./InviteModal";
import styled from "styled-components";
import { ProjectSettings } from "./ProjectSettings";

export const SelectedProject = () => {
  const params: Params = useParams();

  const selected = useProject(params.id);

  if (selected.isError) {
    history.push("/manage/projects");
    return;
  }

  // const handleDeleteProject = async () => {
  //   await dispatch(deleteProject(params.id));
  //   history.replace(`/manage/projects`);
  // };

  // Do mutation
  // export const deleteProject = async (id: string) => {
  //     return await client.delete(`/projects/${id}`);
  //   }

  if (!selected.data) {
    return null;
  } else {
    return <Component project={selected.data} />;
  }
};

const Component = ({ project }: { project: Project }) => {
  let team: Team | undefined;
  let memberships: Memberships[] | undefined;
  const params: { id: string } = useParams();

  const [mutateTeam] = useCreateTeam();
  const [mutateInvite] = useCreateInvite();
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const selectedTeam = useTeam(project.teamId);
  if (selectedTeam.isSuccess) {
    team = selectedTeam.data;
  }

  const members = useTeamMemberships(team?.id);
  if (members.isSuccess) {
    memberships = members.data;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [window]);

  let navbarClasses = ["proj-management"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  const handleModal = async () => {
    if (!team) {
      setCreateTeamModalOpen(true);
    } else {
      setInviteModalOpen(true);
    }
  };

  const handleTeam = async (teamName: string) => {
    mutateTeam({
      teamName,
      projectId: params.id,
    });
    setCreateTeamModalOpen(false);
  };

  const handleInvite = async (emailList: string[]) => {
    if (team) {
      mutateInvite({
        team,
        emailList,
      });
    }
    setInviteModalOpen(false);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  if (!project) {
    return <Loading />;
  } else {
    return (
      <>
        <Header>
          <div>
            <h1>
              Project/
              <ProjectName>{project.name}</ProjectName>
            </h1>
            <span>{project.description}</span>
          </div>

          <ProjectManagement className={navbarClasses.join(" ")}>
            <IconButton onClick={toggleSettings}>
              <MoreHoriz />
            </IconButton>

            <MemberManagement>
              <StyledAdd onClick={handleModal} />
              {team && (
                <>
                  <ProjectTeam team={team} />
                  <InviteModal
                    open={isInviteModalOpen}
                    onClose={() => setInviteModalOpen(false)}
                    onSubmit={handleInvite}
                  />
                </>
              )}
            </MemberManagement>

            <CreateTeamModal
              open={isCreateTeamModalOpen}
              onClose={() => setCreateTeamModalOpen(false)}
              onSubmit={handleTeam}
            />
          </ProjectManagement>
        </Header>
        <SprintBoard project={project} />
        <ProjectSettings
          open={isSettingsOpen}
          project={project}
          memberships={memberships}
          onClose={toggleSettings}
        />
      </>
    );
  }
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: var(--p96);
`;
const ProjectName = styled.span`
  text-transform: capitalize;
  font-family: ProximaNova-Light;
`;

const ProjectManagement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  z-index: 1;

  @media only screen and (max-width: 1400px) {
    position: fixed;
    right: var(--p16);
  }
`;

const MemberManagement = styled.div`
  display: flex;
  align-items: center;
  padding-top: var(--p16);
`;

const StyledAdd = styled(Add)`
  width: var(--p32);
  height: var(--p32);
  color: var(--gray7);
  cursor: pointer;
`;
