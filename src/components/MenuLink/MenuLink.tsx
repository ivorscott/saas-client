import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";

interface Props {
  to: string;
  children: any;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const MenuLink = ({ children, ...custom }: Props) => {
  return (
    <Link {...custom}>
      <MenuItem>{children}</MenuItem>
    </Link>
  );
};
