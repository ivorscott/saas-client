import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";

export interface Props {
  open: boolean;
  title: string;
  children: any;
  onClose: () => void;
  onSubmit: (data?: any) => void;
}

export const Modal = (props: Props) => {
  const { open, title, children, onClose, onSubmit, ...rest } = props;

  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <Container>
        <Header>
          <h2>{title}</h2>
          <div>
            <StyledIconButton size="small" onClick={props.onClose}>
              <Close fontSize="small" />
            </StyledIconButton>
          </div>
        </Header>
        <DialogContent>{children}</DialogContent>
      </Container>
    </Dialog>
  );
};

const Container = styled.div`
  width: var(--p384);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p8) var(--p24);
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
    color: var(--primary);
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin-left: var(--p4);
`;
