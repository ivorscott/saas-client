import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth0Client } from "../../../services/Auth";
import { Menu } from "./Menu";
import { RootState } from "../../../store";
import { Auth } from "aws-amplify";

const UserMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const user = useSelector((state: RootState) => state.auth);
  const { image } = useSelector((state: RootState) => state.account);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogOut = async () => {
    auth0Client.logout();
    Auth.signOut();
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
    <Menu
      anchorRef={anchorRef}
      isOpen={isOpen}
      user={user}
      image={image}
      onClose={handleClose}
      onToggle={handleToggle}
      onLogOut={handleLogOut}
      onKeyDown={handleListKeyDown}
    />
  );
};

export { UserMenu };
