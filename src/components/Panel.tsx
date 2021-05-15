import { TextField, IconButton } from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Close from "@material-ui/icons/Close";
import React from "react";
import styled from "styled-components";

interface Actions {
  onClose: () => void;
  onSubmit: () => void;
  toggleEditing: () => void;
}

interface Props extends Actions {
  children: any;
  title: string;
  isEditing: boolean;
  hasChanged: boolean;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export const PanelForm = (props: Props) => {
  return (
    <Panel className="shade3">
      <header>
        <h2>{props.title}</h2>
        <StyleSettings>
          {props.hasChanged && <span className="modified">modified</span>}
          {props.isEditing && props.hasChanged && (
            <PanelButton className="primary" onClick={props.onSubmit}>
              {props.ctaPrimaryText}
            </PanelButton>
          )}

          <PanelButton
            className={props.isEditing ? "editing" : ""}
            onClick={props.toggleEditing}
          >
            {props.isEditing ? "Cancel" : "Edit"}
          </PanelButton>
          <StyledIconButton size="small">
            <MoreHoriz />
          </StyledIconButton>
          <StyledIconButton size="small" onClick={props.onClose}>
            <Close fontSize="small" />
          </StyledIconButton>
        </StyleSettings>
      </header>

      {props.children}
    </Panel>
  );
};

export const PanelSection = styled.section`
  color: var(--gray10);
  margin-bottom: var(--p16);
  h3 {
    font-family: ProximaNova-Semibold;
    color: var(--gray6);
  }
  .inline {
    display: flex;
    align-items: center;
    margin-bottom: var(--p16);
  }
  .inline h3 {
    margin: 0;
  }
  .inline span {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    color: var(--gray10);
    margin-left: var(--p4);
  }
`;

export const PanelField = styled(TextField)`
  background: var(--secondary);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  color: var(--gray10);

  & fieldset {
    border: none;
  }
  & input {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    padding: var(--p4) var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const Panel = styled.div`
  width: var(--p512);
  max-height: 100%;
  position: fixed;
  top: var(--p16);
  right: var(--p16);
  z-index: 3;
  padding: var(--p32);
  background: var(--white1);
  overflow: auto;
  header {
    display: flex;
    align-items: center;
  }
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
  }
  .modified {
    font-size: var(--p12);
    display: flex;
    align-items: center;
    margin-right: var(--p8);
  }
`;

const StyleSettings = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: flex-start;
  color: var(--gray6);
  cursor: pointer;
`;

const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin-left: var(--p4);
`;

const PanelButton = styled.button`
  background: var(--gray1);
  color: var(--gray6);
  padding: var(--p4) var(--p12);
  border-radius: 4px;
  border-style: none;
  margin: var(--p4);

  &:hover {
    background: var(--gray2);
    cursor: pointer;
  }
  &.primary {
    color: var(--white1);
    background: var(--green4);
    padding: var(--p4) var(--p12);
    font-family: ProximaNova-Bold;
    border-radius: 4px;
    border-style: none;
  }
  &.editing {
    color: var(--white1);
    background: var(--primary);
    font-family: ProximaNova-Bold;
    padding: var(--p4) var(--p12);
    border-radius: 4px;
    border-style: none;
    &:hover {
      background: var(--gray10);
    }
  }
`;
