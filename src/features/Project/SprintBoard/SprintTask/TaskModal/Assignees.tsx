import { Select, MenuItem, FormControl } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useProject, useTeamMemberships } from "../../../../../hooks/project";
import { Memberships, Task } from "../../../types";
import styled from "styled-components";

function makeUserDict(members: Memberships[] | undefined): {
  [index: string]: Memberships | undefined;
} {
  if (!members) {
    return;
  }
  return (members || []).reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr.userId}`]: {
        ...curr,
      },
    };
  }, {});
}

export const SelectAssignees = ({
  formValues,
  isEditing,
  toggleEditing,
  onChange,
}: {
  formValues: Task;
  isEditing: boolean;
  toggleEditing: () => void;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
}) => {
  const params: { id: string } = useParams();
  const { data: project } = useProject(params.id);
  const { data, isError } = useTeamMemberships(project?.teamId);
  const users = makeUserDict(data);

  if (!data || isError) {
    return null;
  }

  const getAssignee = () => {
    const user = users[formValues.assignedTo];
    if (user) {
      return `${user.firstName} ${user.lastName || ""}`;
    }
    return "Unassigned";
  };

  return (
    <StyledFormControl>
      {isEditing ? (
        <Select
          className="field"
          displayEmpty
          value={formValues.assignedTo ? formValues.assignedTo : ""}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((member) => (
            <MenuItem key={member.userId} value={member.userId}>
              {member.firstName + " " + (member.lastName || "")}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <span onDoubleClick={toggleEditing}>{getAssignee()}</span>
      )}
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  .field > div {
    padding: var(--p4) var(--p8);
    width: var(--p192);
    color: var(--gray10);
  }

  .field fieldset {
    border: 1px solid var(--gray1);
  }
`;
