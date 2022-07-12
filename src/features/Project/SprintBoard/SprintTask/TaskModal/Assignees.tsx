import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeUserDict } from "helpers/helpers";
import { useUsers } from "hooks/users";
import React from "react";
import { Task } from "types/board";

export const SelectAssignees = ({
  formValues,
  isEditing,
  toggleEditing,
  onChange,
}: {
  formValues: Task;
  isEditing: boolean;
  toggleEditing: () => void;
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void;
}) => {
  const { data, isError } = useUsers();
  const users = makeUserDict(data);

  if (!data || isError) {
    return null;
  }

  const getAssignee = () => {
    const user = users && users[formValues.assignedTo];
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
            <em>Unassign</em>
          </MenuItem>
          {data.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.firstName + " " + (user.lastName || "")}
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
