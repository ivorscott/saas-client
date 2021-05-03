import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Add } from "@material-ui/icons";
import styled from "styled-components";
import { CreateTeamModal } from "./CreateTeamModal";
import { client } from "../../../services/APIService";
import { Params, Team } from "../types";
import { InviteModal } from "./InviteModal";
import { IconButton } from "@material-ui/core";

const StyledMemberManagement = styled.div`
  width: 100%;
  padding-top: var(--p16);
`;

const StyledAdd = styled(Add)`
  width: 35px;
  height: 35px;
  color: #9ccc65;
  cursor: pointer;
`;

const StyledMembers = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledAvatars = styled(IconButton)`
  background: #ececec;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: var(--p34);
  height: var(--p34);
  text-align: center;
  font-size: var(--p12);
  margin: 0 var(--p4);
`;

interface Props {
  team: null | Team;
}

const ProjectTeam = ({ team }: Props) => {
  const params: Params = useParams();
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const handleModal = async () => {
    if (!team?.name) {
      setCreateTeamModalOpen(true);
    } else {
      setInviteModalOpen(true);
    }
  };

  const handleTeam = async (team: string) => {
    await client.post(`/users/teams`, {
      name: team,
      projectId: params.id,
    });
    setCreateTeamModalOpen(false);
  };

  const handleInvite = async (emailList: string[]) => {
    await client.post(`/users/teams/${team?.id}/invites`, {
      emailList,
    });
    setInviteModalOpen(false);
  };

  return (
    <>
      <StyledMemberManagement>
        <StyledMembers>
          <StyledAdd onClick={handleModal} />
          <StyledAvatars>AB</StyledAvatars>
          <StyledAvatars>EB</StyledAvatars>
          <StyledAvatars>AE</StyledAvatars>
        </StyledMembers>
      </StyledMemberManagement>
      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
        onCreate={handleTeam}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </>
  );
};

export { ProjectTeam };
