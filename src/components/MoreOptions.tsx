import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
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
