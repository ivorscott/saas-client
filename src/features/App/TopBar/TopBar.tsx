import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Notifications from "@material-ui/icons/Notifications";
import { UserMenu } from "../../../shared/components/UserMenu";
import { SearchBar } from "../SearchBar";
import { NotifyModal } from "./NotifyModal";
import { Invite } from "./types";
import { client as api } from "../../../services/APIService";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import styled from "styled-components";

export const TopBar = () => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const { data: invites } = useQuery<Invite[], { error?: AxiosError }>(
    "invites",
    async () => await api.get("/users/teams/invites")
  );

  const unread = invites?.filter((invite) => invite.read === false);

  const toggleNotifications = () => setNotificationsOpen(!isNotificationsOpen);

  return (
    <>
      <TopContainer>
        <SearchBar />
        <TopMenu>
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
        </TopMenu>
      </TopContainer>
      <NotifyModal invites={invites} open={isNotificationsOpen} />
    </>
  );
};

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
  height: var(--p32);
  width: var(--p32);
  .active {
    color: var(--blue6);
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--p32);
  height: var(--p64);
  background: var(--white2);
  border-bottom: 1px solid var(--gray2);
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
