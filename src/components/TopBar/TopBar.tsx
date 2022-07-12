import Notifications from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useInvites } from "hooks/invites";
import React, { useState } from "react";

import { SearchBar } from "../SearchBar";
import { UserMenu } from "../UserMenu";
import { NotifyModal } from "./NotifyModal";

export const TopBar = () => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const invites = useInvites();

  const unread = (invites.data || []).filter((invite) => invite.read === false);

  const toggleNotifications = () => setNotificationsOpen(!isNotificationsOpen);

  return (
    <>
      <Bar>
        <SearchBar />
        <menu>
          <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={unread?.length}
          >
            <AlertButton onClick={toggleNotifications}>
              <Notifications className={isNotificationsOpen ? "active" : ""} />
            </AlertButton>
          </Badge>
          <UserMenu />
        </menu>
      </Bar>
      <NotifyModal invites={invites.data} open={isNotificationsOpen} />
    </>
  );
};

const Bar = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--p32);
  height: var(--p64);
  background: var(--white2);
  border-bottom: 1px solid var(--gray2);
  menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
  height: var(--p32);
  width: var(--p32);
  .active {
    color: var(--blue6);
  }
`;
