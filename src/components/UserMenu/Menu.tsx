import React, { RefObject } from "react";
import {
  List,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  ListItemText,
  ListItemAvatar,
  Divider,
  ListItemButton,
} from "@mui/material";
import { MenuLink } from "../MenuLink";
import { User } from "../../hooks/types";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";
import styled from "styled-components";

interface Actions {
  onClose: (event: React.MouseEvent<EventTarget>) => void;
  onLogOut: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

interface Props extends Actions {
  user: User | undefined;
  isOpen: boolean;
  anchorRef: RefObject<HTMLButtonElement>;
}

export const Menu: React.FC<Props> = ({
  user,
  isOpen,
  anchorRef,
  onClose,
  onLogOut,
  onKeyDown,
}) => (
  <StyledPopper
    open={isOpen}
    anchorEl={anchorRef.current}
    role={"dropdown"}
    transition
    disablePortal
  >
    {({ TransitionProps }: any) => (
      <Grow {...TransitionProps}>
        <Paper>
          <ClickAwayListener onClickAway={() => onClose}>
            <div>
              <MenuBody user={user} onClose={onClose} />
              <Divider />
              <MenuList autoFocusItem={isOpen} onKeyDown={onKeyDown}>
                <MenuItem>
                  <div>
                    <MenuH2 className="slim">Basic Plan</MenuH2>
                    <div>
                      <Seats>0 of 3 seats available</Seats>
                      <Upgrade to={"#"}>Upgrade</Upgrade>
                    </div>
                  </div>
                </MenuItem>
                <MenuLink to="/manage/account" onClick={onClose}>
                  <MenuH2>Manage Account</MenuH2>
                </MenuLink>
                <Divider />
                <MenuItem onClick={onLogOut}>
                  <MenuH2 className="logout">Sign Out</MenuH2>
                </MenuItem>
              </MenuList>
            </div>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </StyledPopper>
);

const MenuBody = ({
  user,
  onClose,
}: {
  user: User | undefined;
  onClose: (event: React.MouseEvent<EventTarget>) => void;
}) => (
  <List component="nav">
    <ListItemButton aria-label="Profile preview" alignItems="flex-start">
      <Link to="/manage/account" onClick={onClose}>
        <ListItemAvatar>
          {user?.picture && (
            <ImageViewer size="md" alt="current user" url={user?.picture} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={<MenuH1>{user?.company}</MenuH1>}
          secondary={<Email>{user?.email}</Email>}
        />
      </Link>
    </ListItemButton>
  </List>
);

const StyledPopper = styled(Popper)`
  position: absolute;
  left: -20px !important;
  z-index: 1051;
  width: var(--p192);
  a,
  li {
    text-decoration: none;
    color: var(--gray8);
  }
`;

const MenuH1 = styled.h1`
  font-size: var(--p16);
  margin-bottom: 4px;
`;
const MenuH2 = styled.h2`
  font-size: var(--p14);
  font-family: ProximaNova-Semibold;
  margin-top: 6px;

  &.slim {
    margin: 0 0 4px 0;
  }

  &.logout {
    margin: 6px 2px 0 0;
  }
`;

const Seats = styled.p`
  color: var(--gray4);
  font-size: var(--p12);
  margin: 0;
`;
const Upgrade = styled(Link)`
  color: var(--blue6) !important;
  font-size: var(--p12);
`;
const Email = styled.span`
  font-family: ProximaNova-Regular;
  font-size: var(--p14);
  color: var(--gray7);
`;
