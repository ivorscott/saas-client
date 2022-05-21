import React, { useRef, useState, useEffect } from "react";
import { Menu } from "./Menu";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import { UserPayload } from "../../services/AuthService/types";
import { client as authClient } from "../../services/AuthService";
import { client as api } from "../../services/APIService";
import ImageViewer from "../ImageViewer";
import styled from "styled-components";

export const UserMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useQuery<UserPayload, UserPayload["error"]>(
    "auth",
    async () => {
      const user = await api.get("/users/me");
      const roles: string[] = []
      // const authResult = await authClient.getAuthDetails();
      // const roles = authResult.claims["https://client.devpie.io/claims/roles"];
      return { ...user, roles };
    }
  );

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogOut = async () => {
    // authClient.logout();
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(isOpen);
  useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  return (
    <>
      <StyledButton
        ref={anchorRef}
        aria-controls={isOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <aside>
          {user?.picture && (
            <ImageViewer alt="current user" url={user?.picture} />
          )}
        </aside>
        <span>{user?.firstName}</span>
      </StyledButton>
      <Menu
        anchorRef={anchorRef}
        user={user}
        isOpen={isOpen}
        onClose={handleClose}
        onLogOut={handleLogOut}
        onKeyDown={handleListKeyDown}
      />
    </>
  );
};

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
