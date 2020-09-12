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
  withStyles,
  WithStyles,
  Typography,
  ClickAwayListener,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { MenuLink } from "../MenuLink";
import ImageViewer from "../ImageViewer";
import { User } from "../../../services/Auth/types";
import { styles } from "./styles";
import { Link } from "react-router-dom";

interface Props extends WithStyles<typeof styles> {
  user: User;
  anchorRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: (event: React.MouseEvent<EventTarget>) => void;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogOut: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

const menu: React.FC<Props> = ({
  classes,
  isOpen,
  anchorRef,
  user,
  onClose,
  onToggle,
  onLogOut,
  onKeyDown,
}) => (
  <div className={classes.root}>
    <div>
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={onToggle}
      >
        {user?.picture && (
          <ImageViewer
            className={classes.profilePic}
            alt="current user image"
            url={user.picture}
          />
        )}
        <span className={classes.name}>{user.firstName}</span>
      </Button>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className={classes.dropdownMenu}
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
                    <Link
                      className={classes.plainText}
                      to="/manage/account"
                      onClick={onClose}
                    >
                      <ListItem
                        button={true}
                        aria-label="Profile preview"
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <>
                            {user?.picture ? (
                              <ImageViewer
                                className={classes.profilePicLarge}
                                alt="current user image"
                                url={user.picture}
                              />
                            ) : (
                              <div className={classes.profilePicLarge} />
                            )}
                          </>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <div className={classes.capitalize}>
                              {`${user.firstName} ${user?.lastName || ""}`}
                            </div>
                          }
                          secondary={
                            <>
                              <Typography component="div" color="textPrimary">
                                {user.email}
                              </Typography>

                              <div className={classes.capitalize}>
                                {user.roles.includes("admin") && "admin"}
                              </div>
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                  </List>
                  <MenuList autoFocusItem={isOpen} onKeyDown={onKeyDown}>
                    <MenuLink
                      to="/manage/account"
                      onClick={onClose}
                      className={classes.item}
                    >
                      My Account
                    </MenuLink>
                    <MenuItem className={classes.item} onClick={onLogOut}>
                      Logout
                    </MenuItem>
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

export const Menu = withStyles(styles)(menu);
