import React from "react";
import { IconButton } from "@material-ui/core";
import { Team } from "./types";
import { useTeamMemberships } from "./hooks";
import styled from "styled-components";

interface Props {
  team: Team;
}

function getInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}

export const ProjectTeam = ({ team }: Props) => {
  const { data, isError } = useTeamMemberships(team.id);

  if (!data || isError) {
    return null;
  } else {
    return (
      <StyledMembers>
        {data.map(({ id, picture, firstName, lastName }) => {
          return picture ? (
            <StyledImage key={id} src={picture} />
          ) : (
            <StyledAvatars key={id}>
              {getInitials(firstName, lastName)}
            </StyledAvatars>
          );
        })}
      </StyledMembers>
    );
  }
};

const StyledMembers = styled.div`
  width: 100%;
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
  width: var(--p32);
  height: var(--p32);
  text-align: center;
  font-size: var(--p12);
  margin: 0 var(--p4);
  text-transform: uppercase;
`;

const StyledImage = styled.img`
  width: var(--p32);
  height: var(--p32);
  border-radius: 50px;
  margin: var(--p4);
  cursor: pointer;
`;
