import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import {
  useCreateTeam,
  useExistingTeam,
  useTeam,
  useTeamMemberships,
} from "../../hooks/teams";
import { useCreateInvite } from "../../hooks/invites";
import { AssignTeamModal } from "./AssignTeamModal";
import { InviteModal } from "./InviteModal";
import styled from "styled-components";
import { Project } from "./types";
import { Avatar } from "../../components/Avatar";

interface Props {
  project: Project;
}

export const ProjectTeam = (props: Props) => {
  const {
    data: memberships,
    isLoading,
    isError,
  } = useTeamMemberships(props.project.teamId);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModalOpen = async () => setModalOpen(!isModalOpen);

  if (isLoading || isError) {
    return null;
  }

  return (
    <Container>
      <StyledAdd onClick={toggleModalOpen} />
      {memberships && memberships.length > 0 && (
        <StyledMembers>
          {memberships.map((membership) => (
            <Avatar
              key={membership.id}
              alt="user avatar"
              size="sm"
              membership={membership}
            />
          ))}
        </StyledMembers>
      )}

      <TeamModals
        isOpen={isModalOpen}
        teamId={props.project.teamId}
        onClose={toggleModalOpen}
      />
    </Container>
  );
};

const TeamModals = (props: {
  teamId?: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const params: { id: string } = useParams();
  const [mutateNewTeam] = useCreateTeam();
  const [mutateExistingTeam] = useExistingTeam();
  const [mutateInvite] = useCreateInvite();

  const handleTeam = async (team: string) => {
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    if (team.match(v4)) {
      mutateExistingTeam({ teamId: team, projectId: params.id });
    } else {
      mutateNewTeam({ teamName: team, projectId: params.id });
    }
    props.onClose();
  };

  const handleInvite = async (emailList: string[]) => {
    if (props.teamId) {
      mutateInvite({ teamId: props.teamId, emailList });
    }
    props.onClose();
  };

  const teamExists = !!props.teamId;

  return (
    <>
      <AssignTeamModal
        open={props.isOpen && !teamExists}
        onClose={props.onClose}
        onSubmit={handleTeam}
      />

      <InviteModal
        open={props.isOpen && teamExists}
        onClose={props.onClose}
        onSubmit={handleInvite}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--p32);
`;

const StyledAdd = styled(Add)`
  width: var(--p32);
  height: var(--p32);
  color: var(--gray7);
  cursor: pointer;
`;

const StyledMembers = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
