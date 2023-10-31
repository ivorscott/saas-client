import {
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Auth } from "aws-amplify";
import { formatPath } from "helpers/helpers";
import { useSeatsAvailable, useUser } from "hooks/users";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "types/user";

import ImageViewer from "../ImageViewer";
import { MenuLink } from "../MenuLink";

export const UserMenu = () => {
  const seatsResult = useSeatsAvailable();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const user = useUser();

  const handleLogOut = async () => {
    await Auth.signOut();
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  return (
    <BasicMenu
      user={user}
      seatsAvailable={seatsResult.seatsAvailable}
      maxSeats={seatsResult.maxSeats}
      onClose={handleClose}
      onLogOut={handleLogOut}
      onKeyDown={handleListKeyDown}
    />
  );
};

interface Actions {
  onClose: (event: React.MouseEvent<EventTarget>) => void;
  onLogOut: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

interface Props extends Actions {
  user: User | undefined;
  seatsAvailable: number;
  maxSeats: number;
}
export function BasicMenu({
  user,
  seatsAvailable,
  maxSeats,
  onClose,
  onLogOut,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const basePath = formatPath(user?.company);

  return (
    <div>
      <StyledButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <aside>
          {user?.picture && (
            <ImageViewer alt="current user" url={user?.picture} />
          )}
        </aside>
        <span>{user?.firstName}</span>
      </StyledButton>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List component="nav">
          <Link to="/me" onClick={onClose}>
            <ListItemButton
              aria-label="Profile preview"
              alignItems="flex-start"
            >
              <StyledListItemAvatar>
                {user?.picture && (
                  <ImageViewer
                    size="md"
                    alt="current user"
                    url={user?.picture}
                  />
                )}
              </StyledListItemAvatar>
              <ListItemText
                primary={
                  <MenuH1>{`${user?.firstName} ${user?.lastName}`}</MenuH1>
                }
                secondary={<Email>{user?.email}</Email>}
              />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <MenuList>
          <MenuLink to={`/${basePath}/account?t=plan`} onClick={onClose}>
            <div>
              <MenuH2 className="slim">Basic Plan</MenuH2>
              <div>
                <Seats>
                  {seatsAvailable} of {maxSeats} seats available
                </Seats>
                <Upgrade to={"#"}>Upgrade to Premium</Upgrade>
              </div>
            </div>
          </MenuLink>
          <MenuLink to={`/${basePath}/account`} onClick={onClose}>
            <MenuH2>Manage Account</MenuH2>
          </MenuLink>
          <Divider />
          <MenuItem onClick={onLogOut}>
            <MenuH2 className="logout">Sign Out</MenuH2>
          </MenuItem>
        </MenuList>
      </StyledMenu>
    </div>
  );
}

const StyledMenu = styled(Menu)`
  position: absolute;
  left: -20px !important;
  z-index: 1051;
  a,
  li {
    text-decoration: none;
    color: var(--gray8);
  }
  .MuiMenu-paper {
    width: var(--p256);
  }
  .MuiList-root {
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  height: var(--p32);
  padding: 0;
  margin: 0 var(--p32);
  aside {
    height: var(--p32);
  }
  span {
    padding: var(--p4);
    text-transform: capitalize;
    font-size: var(--p16);
    font-family: ProximaNova-Semibold;
  }
`;

const StyledListItemAvatar = styled(ListItemAvatar)`
    background: var(--gray3);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: var(--p14);
    margin-left: 0;
}
`;

const MenuH1 = styled("h1")`
  font-size: var(--p16);
  margin-bottom: 4px;
`;
const MenuH2 = styled("h2")`
  font-size: var(--p14);
  font-family: ProximaNova-Semibold;
  margin-top: 6px;

  &.slim {
    margin: 0 0 4px 0;
  }
`;

const Seats = styled("p")`
  color: var(--gray4);
  font-size: var(--p12);
  margin: 0;
`;
const Upgrade = styled(Link)`
  color: var(--blue6) !important;
  font-size: var(--p12);
`;
const Email = styled("span")`
  font-family: ProximaNova-Regular;
  font-size: var(--p14);
  color: var(--gray7);
`;
