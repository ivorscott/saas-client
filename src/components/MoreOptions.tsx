import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { MoreHoriz } from "@material-ui/icons";
import styled from "styled-components";

export const MoreOptions = ({
  aref,
  className,
  onClick,
  ...props
}: {
  aref?: React.RefObject<HTMLButtonElement>;
  className?: string;
  onClick: () => void;
}) => (
  <StyledButton ref={aref} size="small" onClick={onClick} {...props}>
    <MoreHoriz />
  </StyledButton>
);

const StyledButton = styled(IconButton)`
  padding: 0 var(--p12);
  border-radius: var(--p4);
`;
