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
import { User } from "../../../services/AuthService/types";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";

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
  <Popper
    open={isOpen}
    anchorEl={anchorRef.current}
    role={undefined}
    transition
    disablePortal
  >
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{
          transformOrigin:
            placement === "bottom" ? "center top" : "center bottom",
        }}
      >
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
  </Popper>
);

const MenuBody = ({
  user,
  onClose,
}: {
  user: User | undefined;
  onClose: (event: React.MouseEvent<EventTarget>) => void;
}) => (
  <List component="nav">
    <Link to="/manage/account" onClick={onClose}>
      <ListItem
        button={true}
        aria-label="Profile preview"
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <div>
            {user?.picture && (
              <ImageViewer alt="current user" url={user?.picture} />
            )}
          </div>
        </ListItemAvatar>
        <ListItemText
          primary={<p>{`${user?.firstName} ${user?.lastName || ""}`}</p>}
          secondary={
            <>
              <p>{user?.email}</p>
              <br />
              {user?.roles?.includes("admin") && "admin"}
            </>
          }
        />
      </ListItem>
    </Link>
  </List>
);
