import React, { RefObject } from "react";
import {
  Button,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  Popper,
  Typography,
  ClickAwayListener,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@material-ui/core";
import { MenuLink } from "../MenuLink";
import { User } from "../../../services/AuthService/types";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";

interface Props {
  user: User;
  image: string;
  anchorRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: (event: React.MouseEvent<EventTarget>) => void;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogOut: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export const Menu: React.FC<Props> = ({
  isOpen,
  anchorRef,
  user,
  image,
  onClose,
  onToggle,
  onLogOut,
  onKeyDown,
}) => (
  <div>
    <div>
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={onToggle}
      >
        <div>
          {user?.picture && <ImageViewer alt="current user" url={image} />}
        </div>
        <span>{user.firstName}</span>
      </Button>
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
                              <ImageViewer alt="current user" url={image} />
                            )}
                          </div>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <p>{`${user.firstName} ${user?.lastName || ""}`}</p>
                          }
                          secondary={
                            <>
                              <p>{user.email}</p>
                              <br />
                              {user.roles.includes("admin") && "admin"}
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                  </List>
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
    </div>
  </div>
);
