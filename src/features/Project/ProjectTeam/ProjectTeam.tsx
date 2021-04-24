import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Add } from "@material-ui/icons";
import styled from "styled-components";
import { CreateTeamModal } from "./CreateTeamModal";
import { client } from "../../../services/APIService";
import { Params } from "../types";
import { Team } from "../reducer";
import { InviteModal } from "./InviteModal";

const StyledMemberManagement = styled.div`
  width: 100%;
  padding-top: 15px;
`;

const StyledAdd = styled(Add)`
  width: 50px;
  height: 50px;
  color: #9ccc65;
  cursor: pointer;
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
    await client.post(`/projects/${params.id}/team`, {
      name: team,
    });
    setCreateTeamModalOpen(false);
  };

  const handleInvite = async (emailList: string[]) => {
    await client.post(`/projects/team/${team?.id}/invite`, {
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
