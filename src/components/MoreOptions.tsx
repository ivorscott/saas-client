import React from "react";
import { IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import styled from "styled-components";

export const MoreOptions = ({ onClick }: { onClick: () => void }) => (
  <StyledButton size="small" onClick={onClick}>
    <MoreHoriz />
  </StyledButton>
);

const StyledButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin: var(--p16) 0;
`;
