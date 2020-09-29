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
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { MenuLink } from "../MenuLink";
import { User } from "../../../services/Auth/types";
import { styles } from "./styles";
import { Link } from "react-router-dom";
import ImageViewer from "../ImageViewer";

interface Props extends WithStyles<typeof styles> {
  user: User;
  image: string;
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
  image,
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
        <div className={classes.profilePic}>
          {user?.picture && (
            <ImageViewer
              className={classes.profilePic}
              alt="current user"
              url={image}
            />
          )}
        </div>
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
                          <div className={classes.profilePicLarge}>
                            {user?.picture && (
                              <ImageViewer
                                className={classes.profilePicLarge}
                                alt="current user"
                                url={image}
                              />
                            )}
                          </div>
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.identity}
                          primary={
                            <Typography
                              component="div"
                              className={classes.capitalize}
                              color="textPrimary"
                            >
                              {`${user.firstName} ${user?.lastName || ""}`}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" color="textPrimary">
                                {user.email}
                              </Typography>
                              <br />
                              {user.roles.includes("admin") && "admin"}
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
