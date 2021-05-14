import React, { RefObject } from "react";
import {
  List,
  ListItem,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { MenuLink } from "../MenuLink";
import { User } from "../../services/AuthService/types";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";
import styled from "styled-components";

interface Props {
  user: User | undefined;
  isOpen: boolean;
  anchorRef: RefObject<HTMLButtonElement>;
  onClose: (event: React.MouseEvent<EventTarget>) => void;
  onLogOut: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
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
    role={undefined}
    transition
    disablePortal
  >
    {({ TransitionProps }) => (
      <Grow {...TransitionProps}>
        <Paper>
          <ClickAwayListener onClickAway={onClose}>
            <div>
              <MenuBody user={user} onClose={onClose} />
              <MenuList autoFocusItem={isOpen} onKeyDown={onKeyDown}>
                <MenuLink to="/manage/account" onClick={onClose}>
                  My Account
                </MenuLink>
                <MenuItem onClick={onLogOut}>Logout</MenuItem>
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
    <ListItem
      button={true}
      aria-label="Profile preview"
      alignItems="flex-start"
    >
      <Link to="/manage/account" onClick={onClose}>
        <ListItemAvatar>
          {user?.picture && (
            <ImageViewer size="md" alt="current user" url={user?.picture} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={<p>{`${user?.firstName} ${user?.lastName || ""}`}</p>}
          secondary={<span>{user?.email}</span>}
        />
      </Link>
    </ListItem>
  </List>
);

const StyledPopper = styled(Popper)`
  position: relative;
  z-index: 3;
  a,
  li {
    text-decoration: none;
    color: var(--gray8);
  }
`;
