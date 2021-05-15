import { Select, MenuItem } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { useProject, useTeamMemberships } from "../../../../../hooks/project";

export const SelectAssignees = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: string }>) => void;
}) => {
  const params: { id: string } = useParams();
  const { data: project } = useProject(params.id);
  const { data, isError } = useTeamMemberships(project?.teamId);

  if (!data || isError) {
    return null;
  }
  return (
    <Select
      className="field"
      displayEmpty
      value={value ? value : ""}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {data.map((member) => (
        <MenuItem key={member.id} value={member.id}>
          {member.firstName + " " + (member.lastName || "")}
        </MenuItem>
      ))}
    </Select>
  );
};
